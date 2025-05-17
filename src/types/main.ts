export interface SearchParams {
  category?: string;
}

export interface BooksPageProps {
  searchParams: Promise<SearchParams>;
}