
import { UserDm } from "../domain/userDm";

export interface UsersRepository {
  currentUser: UserDm | null;
  save (user: UserDm): void;
  getCurrentUser (): Promise<UserDm | null>;
}
