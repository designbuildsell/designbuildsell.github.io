import React from 'react';
import Link from '@docusaurus/Link';
import { useDocsData } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

type Doc = {
  id: string;
  title: string;
  permalink: string;
  frontMatter: {
    tags?: string[];
  };
};

const RelatedArticles = () => {
  // Load all docs from all three plugins
  const designDocs = useDocsData('design')?.docs || {};
  const buildDocs = useDocsData('build')?.docs || {};
  const sellDocs = useDocsData('sell')?.docs || {};

  // Combine all docs into an array
  const allDocs: Doc[] = [
    ...Object.values(designDocs),
    ...Object.values(buildDocs),
    ...Object.values(sellDocs),
  ];

  // Get current URL
  const { pathname } = useLocation();

  // Find current doc by matching permalink
  const currentDoc = allDocs.find(doc => doc.permalink === pathname);

  // If no current doc or no tags, show nothing
  if (!currentDoc || !currentDoc.frontMatter.tags?.length) {
    return null;
  }

  const currentTags = currentDoc.frontMatter.tags;

  // Find related docs with shared tags
  const relatedDocs = allDocs
    .filter(doc => doc.permalink !== pathname) // Exclude current
    .map(doc => {
      const docTags = doc.frontMatter.tags || [];
      const commonTagsCount = docTags.filter(tag => currentTags.includes(tag)).length;
      return { ...doc, commonTagsCount };
    })
    .filter(doc => doc.commonTagsCount > 0)
    .sort((a, b) => b.commonTagsCount - a.commonTagsCount)
    .slice(0, 5); // Top 5

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