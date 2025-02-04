
import { ValidatedUser } from "@dddforum/shared/src/api/users";
import { User } from "@prisma/client";

export interface UsersRepository {
  findUserByEmail(email: string): Promise<User | null>;
  save(user: ValidatedUser): Promise<User>;
  findById(id: number): Promise<User | null>;
  delete(email: string): Promise<void>;
  findUserByUsername(username: string): Promise<User | null>;
  update(id: number, props: Partial<ValidatedUser>): Promise<User | null>;
}
