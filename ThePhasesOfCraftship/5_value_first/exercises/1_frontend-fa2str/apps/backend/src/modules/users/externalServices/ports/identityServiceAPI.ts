import { NotFoundError } from "@dddforum/errors";
import { User } from "../../domain/user";

export interface IdentityServiceAPI {
  getUserById (userId: string): Promise<User | NotFoundError>
  findUserByEmail (email: string): Promise<User | NotFoundError>;
}