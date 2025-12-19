import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import BookCard from '../../components/BookCard';
import { filterBooks } from '../../utils/books';
import booksData from '../../data/books.json';
import styles from './books.module.css';

// Extract unique tags for the filter list
const ALL_TAGS = Array.from(new Set(booksData.flatMap(book => book.tags))).sort();

type SortOption = 'rating' | 'title' | 'newest' | 'oldest';

export default function BooksPage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('title');

  const filteredAndSortedBooks = useMemo(() => {
    // 1. Filter by Search Query
    let result = filterBooks(booksData, searchQuery);

    // 2. Filter by Tag
    if (selectedTag) {
      result = result.filter(book => book.tags.includes(selectedTag));
    }

    // 3. Sort
    result.sort((a, b) => {
      switch (sortOption) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'newest':
          return parseInt(b.publication_year) - parseInt(a.publication_year);
        case 'oldest':
          return parseInt(a.publication_year) - parseInt(b.publication_year);
        case 'rating':
          return b.rating-a.rating;  
        default:
          return a.title.localeCompare(b.title); // Alphabetical A-Z (Default)
      }
    });

    return result;
  }, [searchQuery, selectedTag, sortOption]);

  return (
    <Layout
      title="Books"
      description="Between the Lines - Guiding minds toward meaning and growth">
      
      <div className={styles.headerContainer}>
        <h1 className={styles.headerTitle}>Between the Lines</h1>
        <p className={styles.headerSubtitle}>Guiding minds toward meaning and growth</p>
        
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search books by title, author, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search books"
          />
        </div>

        <div className="container">
          <div className={styles.controlsContainer}>
            {/* Filter Pill */}
            <div className={styles.pillContainer}>
              <span className={styles.pillLabel}>Filter by:</span>
              <select 
                className={styles.selectInput}
                value={selectedTag || ''}
                onChange={(e) => setSelectedTag(e.target.value || null)}
                aria-label="Filter by category"
              >
                <option value="">All Categories</option>
                {ALL_TAGS.map(tag => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Pill */}
            <div className={styles.pillContainer}>
              <span className={styles.pillLabel}>Sort by:</span>
              <select 
                className={styles.selectInput}
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                aria-label="Sort books"
              >
                <option value="title">Alphabetical (A-Z)</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>

              </select>
            </div>
          </div>
        </div>
      </div>

      <main className="container padding-bottom--xl">
        <div style={{ textAlign: 'center', opacity: 0.7, fontSize: '0.9rem', marginBottom: '1rem' }}>
          Showing {filteredAndSortedBooks.length} books
        </div>

        {filteredAndSortedBooks.length > 0 ? (
          <div className={styles.booksGrid}>
            {filteredAndSortedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text--center margin-vert--xl">
            <p>No books found matching your criteria.</p>
            <button 
              className="button button--link"
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
              }}>
              Clear filters
            </button>
          </div>
        )}
      </main>
    </Layout>
  );
}