/* Defines the Book entity */
export interface Book {
  kind: string;
  totalItems: number;
  items: BookItem[];
}

export interface BookItem {
  id: string;
  title: string;
  description: string;
  smallThumbnail: string;
  thumbnail: string;
  publisher: string;
  pageCount?: number;
  averageRating?: number;
  language?: string;
  previewLink?: string;
  purchaseInfo?: object;
}

