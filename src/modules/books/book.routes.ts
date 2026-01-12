import { Request, Response, Router } from "express";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { BookRepositoryPostgres } from "./book.repository.pg";
import { authMiddleware } from "../shared/middlewares/auth.middleware";

const router = Router();

// wiring (injeção manual)
const bookRepository = new BookRepositoryPostgres();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

// endpoints
router.post(
    "/:id/rent", 
    authMiddleware, 
    (req: Request<{ id: string }>, res: Response) => bookController.rent(req, res)
);

export { router as bookRoutes };
