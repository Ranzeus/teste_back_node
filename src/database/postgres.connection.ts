import { Pool } from "pg";
import "dotenv/config";


console.log("DATABASE_URL:", process.env.DATABASE_URL);

export const postgresPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});