import jwt from "jsonwebtoken";
import { LoginDTO } from "./auth.dto";

export class AuthService {
  async login(data: LoginDTO): Promise<{ token: string }> {
    const { username, password } = data;

    // mock simples
    if (username !== "admin" || password !== "admin") {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { sub: username },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "1h" }
    );

    return { token };
  }
}
