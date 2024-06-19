import { User } from "@dddforum/shared/src/api/users";
import { CreateUserCommand } from "../usersCommand";

export interface UsersRepository {
  findUserByEmail(email: string): Promise<User | null>;
  // @note The ideal return type here is a domain object, not a DTO. For
  // demonstration purposes, we've kept it intentionally simple to focus on testing.
  // @see Pattern-First for domain objects
  save(user: CreateUserCommand): Promise<User & { password: string }>;
  findById(id: number): Promise<User | null>;
  delete(email: string): Promise<void>;
  findUserByUsername(username: string): Promise<User | null>;
  update(id: number, props: Partial<CreateUserCommand>): Promise<User | null>;
}
