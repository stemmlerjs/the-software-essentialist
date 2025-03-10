
import { UserDm } from "../domain/userDm";

export interface UsersRepository {
  save (user: UserDm): void;
  currentUser: UserDm | null;
  getCurrentUser (): Promise<UserDm | null>;
}
