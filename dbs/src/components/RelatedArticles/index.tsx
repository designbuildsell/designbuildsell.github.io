import React from 'react';
import Link from '@docusaurus/Link';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useDocsData } from '@docusaurus/plugin-content-docs/client';
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
  // ✅ Get current doc using supported hook
  const currentDoc = useDoc();
  const currentTags = currentDoc.metadata.frontMatter.tags || [];

  if (currentTags.length === 0) {
    return null;
  }

  // ✅ Get all docs in the current version
  const { docs } = useDocsData('default'); // Change if you use pluginId like 'design', 'build', etc.

  const relatedDocs = Object.values(docs)
    .filter(doc => doc.id !== currentDoc.id)
    .map(doc => {
      const docTags = doc.frontMatter.tags || [];
      const commonTagsCount = docTags.filter(tag => currentTags.includes(tag)).length;
      return { ...doc, commonTagsCount };
    })
    .filter(doc => doc.commonTagsCount > 0)
    .sort((a, b) => b.commonTagsCount - a.commonTagsCount)
    .slice(0, 5);

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