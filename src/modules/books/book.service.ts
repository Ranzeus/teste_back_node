import { CreateBookDTO, UpdateBookDTO } from "./book.dto";
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

  async createBook(createBookDTO: CreateBookDTO): Promise<{ title: string; msg: string }> {
    
    try {

      if (!createBookDTO.title || !createBookDTO.author) {
        throw new Error("title and author are required");
      }

      const book = await this.bookRepository.create(createBookDTO);

      return {
        title: book.title,
        msg: "Sucessfully created book"
      };

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error("Problens to Register Book: " + message);
    }
  }

  async deleteBook(bookId: number): Promise<{ bookId: number; rented: true }> {
    const book = await this.bookRepository.findById(bookId);

    if (!book) {
      throw new Error("Book not found");
    }

    if (book.isRented) {
      throw new Error("Book already rented");
    }

    await this.bookRepository.delete(bookId);

    return {
      bookId,
      rented: true
    };
  }

  async updateBook(bookDTO: UpdateBookDTO): Promise<{ msg: string }> {
    
    try {

      if (!bookDTO.title || !bookDTO.author) {
        throw new Error("title and author are required");
      }

      const book = await this.bookRepository.update(bookDTO);

      return {
        msg: "Book updated successfully"
      };

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error("Problens to Register Book: " + message);
    }
  }
}
