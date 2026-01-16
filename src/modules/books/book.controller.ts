import { Request, Response } from "express";
import { BookService } from "./book.service";
import { CreateBookDTO, UpdateBookDTO } from "./book.dto";

export class BookController {
  constructor(private readonly bookService: BookService) { }

  async rent(req: Request<{ id: string }>, res: Response): Promise<Response> {
    const bookIdStr = req.params.id;
    if (!bookIdStr) return res.status(400).json({ error: "id is required" });

    const bookId = Number(bookIdStr);
    if (Number.isNaN(bookId)) return res.status(400).json({ error: "id must be a number" });
    try {
      await this.bookService.rentBook(bookId);
      return res.status(200).json({
        message: "Book rented successfully",
        bookId
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: message });
    }
  }

  async create(req: Request<{}, {}, CreateBookDTO >,res: Response): Promise<Response> {
    
    try {
      const response = await this.bookService.createBook(req.body);
      return res.status(200).json({
        message: "Book created successfully",
        bookData: response
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: message });
    }
  }

  async delete(req: Request<{ id: string }>, res: Response): Promise<Response> {
    const bookIdStr = req.params.id;
    if (!bookIdStr) return res.status(400).json({ error: "id is required" });

    const bookId = Number(bookIdStr);
    if (Number.isNaN(bookId)) return res.status(400).json({ error: "id must be a number" });
    try {
      const response = await this.bookService.deleteBook(bookId);
      return res.status(200).json({
        message: "Book deleted successfully",
        bookId
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: message });
    }
  }

  async update(req: Request<{}, {}, UpdateBookDTO>,res: Response): Promise<Response> {
    
    try {
      const response = await this.bookService.updateBook(req.body);
      return res.status(201).json({
        message: response
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: message });
    }
  }
}
