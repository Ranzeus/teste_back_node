import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {

  const authHeader = req.headers.authorization;
  const parts = authHeader?.split(" ");
  const token = parts?.[1];
  const secret = process.env.JWT_SECRET ?? "dev_secret";

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  
  try {
    jwt.verify(token, secret);
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
