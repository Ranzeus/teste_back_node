import { BookRepository } from "./book.repository";
import { Book } from "./book.model";
import { CreateBookDTO, UpdateBookDTO } from "./book.dto";

export class BookRepositoryMock implements BookRepository {
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

  async findById(id: number): Promise<Book | null> {
    return this.books.find(book => book.id === id) ?? null;
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

  async markAsRented(id: number): Promise<void> {
    const book = await this.findById(id);
    if (book) {
      book.isRented = true;
    }
  }
}
