import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import styles from '../pages/books/books.module.css';
import type { Book } from '../utils/books';

interface Props {
  readonly bookData: Book;
}

export default function BookDetail({ bookData }: Props): JSX.Element {
  const book = bookData;

  if (!book) {
    return (
      <Layout title="Book Not Found">
        <div className="container margin-vert--xl text--center">
          <h1>Book Not Found</h1>
          <p>We couldn't find the book you're looking for.</p>
          <div className="margin-top--md">
            <Link to="/books" className="button button--primary">Back to Library</Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{book.title} | Design Build Sell</title>
        <meta name="description" content={book.summary} />
        <meta property="og:image" content={book.cover_url} />
      </Head>
      
      <main className="container margin-vert--lg">
        <Link to="/books" className="button button--link margin-bottom--md">
          ← Back to Library
        </Link>

        <div className={styles.detailLayout}>
          <div className={styles.detailCover}>
            <img 
              src={book.cover_url} 
              alt={`Cover of ${book.title}`}
              loading="eager"
            />
          </div>
          
          <div className={styles.detailContent}>
            <div className="badge badge--secondary margin-bottom--sm">{book.publication_year}</div>
            <h1 style={{ fontSize: '3rem', lineHeight: '1.1', marginBottom: '0.5rem' }}>{book.title}</h1>
            <p style={{ fontSize: '1.5rem', color: 'var(--ifm-color-emphasis-600)', marginBottom: '1.5rem' }}>
              by {book.author}
            </p>
            
            <div className="margin-bottom--lg">
              {book.tags.map(tag => (
                <span key={tag} className="badge badge--primary margin-right--sm">{tag}</span>
              ))}
              <span className="badge badge--warning" style={{ color: '#000' }}>★ {book.rating}/5.0</span>
            </div>

            <div className="card padding--lg margin-bottom--lg" style={{ backgroundColor: 'var(--ifm-background-surface-color)' }}>
              <h3 style={{ borderBottom: '1px solid var(--ifm-color-emphasis-200)', paddingBottom: '0.5rem' }}>Overview</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{book.summary || "Summary coming soon..."}</p>
            </div>

            <div className={styles.detailActions}>
              {book.open_library_url && (
                <Link 
                  to={book.open_library_url} 
                  className="button button--primary button--lg">
                  Borrow from Open Library
                </Link>
              )}
              
              {book.amazon_url && (
                <Link 
                  to={book.amazon_url} 
                  className="button button--outline button--secondary button--lg">
                  Buy on Amazon
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}