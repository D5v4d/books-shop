export interface BooksData {
  volumeInfo?: {
    authors: string[];
    title: string;
    description: string;
    imageLinks: { smallThumbnail: string };
    averageRating: number;
    ratingsCount: number;
  };
  saleInfo?: {
    listPrice?: {
      amount: number;
      currencyCode: string;
    };
  };
}

export interface ListBooksProps {
  data: BooksData[];
}

export interface entitiesBooks {
  id: string | number;
  volumeInfo?: {
    authors: string[];
    title: string;
    description: string;
    imageLinks: { smallThumbnail: string };
    averageRating: number;
    ratingsCount: number;
  };
  saleInfo?: {
    listPrice?: {
      amount: number;
      currencyCode: string;
    };
  };
}