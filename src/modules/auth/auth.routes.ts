import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserRepositoryPostgres } from "../users/user.repository.pg";
import { postgresPool } from "../../database/postgres.connection";

const router = Router();

// wiring (injeção manual)
const userRepository = new UserRepositoryPostgres(postgresPool);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

// routes
router.post("/login", (req, res) => authController.login(req, res));

export { router as authRoutes };
