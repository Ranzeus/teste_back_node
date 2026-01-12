// modules/users/user.repository.ts
import { User } from "./user.model";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
}
