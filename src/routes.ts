import { Router } from "express";
import { bookRoutes } from "./modules/books/book.routes";

const routes = Router();

routes.use("/books", bookRoutes);

export { routes };
