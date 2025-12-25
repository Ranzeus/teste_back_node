import { Router } from "express";
import { authRoutes } from "./modules/auth/auth.routes";
import { bookRoutes } from "./modules/books/book.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/books", bookRoutes);

export { routes };
