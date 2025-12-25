import { Router } from "express";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { BookRepositoryMock } from "./book.repository.mock";

const router = Router();

// wiring (injeção manual)
const bookRepository = new BookRepositoryMock();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

// endpoints
router.post("/:id/rent", (req, res) => bookController.rent(req, res));

export { router as bookRoutes };
