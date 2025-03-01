
import { CreateUserParams, CreateUserResponse } from "@dddforum/shared/src/api/users";
import { UserDm } from "../domain/userDm";

export interface UsersRepository {
  save (user: UserDm): void;
  register (input: CreateUserParams): Promise<CreateUserResponse>
  currentUser: UserDm | null;
  getCurrentUser (): Promise<UserDm | null>;
}
