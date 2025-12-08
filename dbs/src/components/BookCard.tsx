import React from 'react';
import Link from '@docusaurus/Link';
import { type Book, slugify } from '../utils/books';
import styles from '../pages/books/books.module.css';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  // Use explicit slug if available, otherwise generate it
  const bookSlug = book.slug || slugify(book.title);
  
  // Link to the static page
  const linkTarget = `/books/${bookSlug}`;
  
  return (
    <div className={styles.bookCard}>
      <div className={styles.cardImageContainer}>
        <Link to={linkTarget} style={{ display: 'contents' }}>
          <img
            src={book.cover_thumbnail_url}
            alt={`Cover of ${book.title}`}
            className={styles.cardImage}
            loading="lazy"
            onError={(e) => {
              // Fallback if image load fails or is missing
              e.currentTarget.style.display = 'none'; 
            }}
          />
        </Link>
      </div>
      
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>
          <Link to={linkTarget} style={{ color: 'inherit', textDecoration: 'none' }}>
            {book.title}
          </Link>
        </h3>
        
        <div className={styles.cardAuthor}>by {book.author}</div>
        
        <div className={styles.cardMetaRow}>
          <span className={styles.cardYear}>{book.publication_year}</span>
          <span className={styles.rating}>★ {book.rating}</span>
        </div>
        
        <Link
          to={linkTarget}
          className={styles.viewDetailsBtn}>
          View Details
        </Link>
      </div>
    </div>
  );
}