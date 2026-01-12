import { postgresPool } from "../../database/postgres.connection";
import { BookRepository } from "./book.repository";
import { Book } from "./book.model";
import { CreateBookDTO, UpdateBookDTO } from "./book.dto";

export class BookRepositoryPostgres implements BookRepository {
  async findById(id: number): Promise<Book | null> {
    const result = await postgresPool.query(
      "SELECT id, title, is_rented FROM books WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) return null;

    return {
      id: result.rows[0].id,
      title: result.rows[0].title,
      isRented: result.rows[0].is_rented,
    };
  }

  async markAsRented(id: number): Promise<void> {
    await postgresPool.query(
      "UPDATE books SET is_rented = true WHERE id = $1",
      [id]
    );
  }

  // MOCK IMPLEMENTATIONS FOR OTHER METHODS

  private books: Book[] = [
    {
      id: 1,
      title: "Clean Code",
      author: "Robert C. Martin",
      isRented: false
    }
  ];

  async findAll(): Promise<Book[]> {
    return this.books;
  }

  async create(data: CreateBookDTO): Promise<Book> {
    const newBook: Book = {
      id: this.books.length + 1,
      ...data,
      isRented: false
    };

    this.books.push(newBook);
    return newBook;
  }

  async update(id: number, data: UpdateBookDTO): Promise<void> {
    const book = await this.findById(id);
    if (!book) return;

    Object.assign(book, data);
  }

  async delete(id: number): Promise<void> {
    this.books = this.books.filter(book => book.id !== id);
  }
}
