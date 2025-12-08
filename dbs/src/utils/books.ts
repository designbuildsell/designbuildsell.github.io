export interface Book {
  id: string;
  title: string;
  author: string;
  slug?: string;
  publication_year: string;
  tags: string[];
  summary: string;
  rating: number;
  cover_thumbnail_url: string;
  cover_url: string;
  open_library_url?: string;
  amazon_url?: string;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/&/g, '-and-')   // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

export function filterBooks(books: Book[], query: string): Book[] {
  const lowercaseQuery = query.toLowerCase();
  return books.filter((book) => {
    return (
      book.title.toLowerCase().includes(lowercaseQuery) ||
      book.author.toLowerCase().includes(lowercaseQuery) ||
      book.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  });
}

export function getBookBySlug(books: Book[], slug: string): Book | undefined {
  return books.find(b => {
    const bookSlug = b.slug || slugify(b.title);
    return bookSlug === slug;
  });
}