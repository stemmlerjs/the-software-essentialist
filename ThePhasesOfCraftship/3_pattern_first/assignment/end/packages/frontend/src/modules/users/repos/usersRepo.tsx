import { UserDm } from "../domain/userDm";

export interface UsersRepository {
  currentUser: UserDm | null;
  getCurrentUser (): Promise<UserDm | null>;
}
