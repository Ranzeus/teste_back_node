export interface CreateBookDTO {
  title: string;
  author: string;
  publishedAt?: string;
  isRented?: boolean;
}

export interface UpdateBookDTO {
  title?: string;
  author?: string;
}
