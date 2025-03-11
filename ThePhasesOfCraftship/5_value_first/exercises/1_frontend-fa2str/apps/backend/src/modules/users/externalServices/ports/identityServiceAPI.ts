import { ApplicationErrors } from"@dddforum/errors;
import { User } from "../../domain/user";

export interface IdentityServiceAPI {
  getUserById (userId: string): Promise<User | ApplicationErrors.NotFoundError>
  findUserByEmail (email: string): Promise<User | ApplicationErrors.NotFoundError>;
}