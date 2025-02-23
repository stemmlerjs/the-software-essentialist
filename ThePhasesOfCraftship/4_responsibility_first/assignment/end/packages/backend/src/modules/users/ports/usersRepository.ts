
import { ValidatedUser } from "@dddforum/shared/src/api/users";
import { User } from "@prisma/client";

export interface UsersRepository {
  findUserByEmail(email: string): Promise<User | null>;
  save(user: ValidatedUser): Promise<User>;
  findById(id: string): Promise<User | null>;
  delete(email: string): Promise<void>;
  update(id: string, props: Partial<ValidatedUser>): Promise<User | null>;
}
