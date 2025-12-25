export interface CreateBookDTO {
  title: string;
  author: string;
}

export interface UpdateBookDTO {
  title?: string;
  author?: string;
}
