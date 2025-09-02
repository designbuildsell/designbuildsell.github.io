import React from 'react';
import useGlobalData from '@docusaurus/useGlobalData';
import { useDoc } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface Doc {
  id: string;
  title: string;
  permalink: string;
  frontMatter: {
    tags?: string[];
  };
}

const RelatedArticles = () => {
  const { metadata } = useDoc();
  const { frontMatter, permalink } = metadata;
  const currentTags = frontMatter.tags || [];

  const globalData = useGlobalData();
  const designDocs = (globalData['docusaurus-plugin-content-docs']?.['design']?.['default']?.docs || []) as Doc[];
  const buildDocs = (globalData['docusaurus-plugin-content-docs']?.['build']?.['default']?.docs || []) as Doc[];
  const sellDocs = (globalData['docusaurus-plugin-content-docs']?.['sell']?.['default']?.docs || []) as Doc[];

  const allDocs = [...designDocs, ...buildDocs, ...sellDocs];

  if (currentTags.length === 0) {
    return null;
  }

  const relatedDocs = allDocs
    .filter(doc => doc.permalink !== permalink) // Exclude the current article
    .map(doc => {
      const docTags = doc.frontMatter.tags || [];
      const commonTags = docTags.filter(tag => currentTags.includes(tag));
      return { ...doc, commonTagsCount: commonTags.length };
    })
    .filter(doc => doc.commonTagsCount > 0) // Keep only articles with at least one common tag
    .sort((a, b) => b.commonTagsCount - a.commonTagsCount) // Sort by number of common tags
    .slice(0, 5); // Limit to 5 related articles

  if (relatedDocs.length === 0) {
    return null;
  }

  return (
    <div className={styles.relatedArticlesContainer}>
      <h3>Related Articles</h3>
      <ul className={styles.relatedArticlesList}>
        {relatedDocs.map(doc => (
          <li key={doc.id} className={styles.relatedArticleItem}>
            <Link to={doc.permalink}>{doc.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedArticles;
