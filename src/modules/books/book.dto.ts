export interface CreateBookDTO {
  title: string;
  author: string;
  publishedAt?: string;
  isRented?: boolean;
}

export interface UpdateBookDTO {
  id: number;
  title: string;
  author: string;
  publishedAt?: string;
  isRented?: boolean;
}
