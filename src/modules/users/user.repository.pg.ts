import { Pool } from "pg";
import { UserRepository } from "./user.repository";
import { User } from "./user.model";

export class UserRepositoryPostgres implements UserRepository {
  constructor(private readonly pool: Pool) {}

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.pool.query(
      `SELECT id, email, password_hash, role FROM users WHERE email = $1`,
      [email]
    );

    if (result.rowCount === 0) return null;

    const row = result.rows[0];

    return {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      role: row.role
    };
  }
}
