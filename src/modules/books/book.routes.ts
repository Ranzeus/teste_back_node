import { Request, Response, Router } from "express";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { BookRepositoryPostgres } from "./book.repository.pg";
import { authMiddleware } from "../shared/middlewares/auth.middleware";
import { CreateBookDTO } from "./book.dto";

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

router.post(
    "/create", 
    authMiddleware, 
    (req: Request<{}, {}, CreateBookDTO>, res: Response) => bookController.create(req, res)
);

router.delete(
    "/:id/delete", 
    authMiddleware, 
    (req: Request<{ id: string }>, res: Response) => bookController.delete(req, res)
);

export { router as bookRoutes };
