import { CreateBookDTO, UpdateBookDTO } from "./book.dto";
import { Book } from "./book.model";

export interface BookRepository {
  findAll(search?: string): Promise<Book[]>;
  findById(id: number): Promise<Book | null>;
  create(data: CreateBookDTO): Promise<Book>;
  update(data: UpdateBookDTO): Promise<void>;
  delete(id: number): Promise<void>;
  markAsRented(id: number): Promise<void>;
}
