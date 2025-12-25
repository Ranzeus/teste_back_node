import { BookRepository } from "./book.repository";

export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async rentBook(bookId: number): Promise<{ bookId: number; rented: true }> {
    const book = await this.bookRepository.findById(bookId);

    if (!book) {
      throw new Error("Book not found");
    }

    if (book.isRented) {
      throw new Error("Book already rented");
    }

    await this.bookRepository.markAsRented(bookId);

    return {
      bookId,
      rented: true
    };
  }
}
