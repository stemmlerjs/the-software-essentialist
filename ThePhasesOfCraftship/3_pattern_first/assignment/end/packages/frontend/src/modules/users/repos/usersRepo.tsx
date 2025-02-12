import { UserDm } from "../domain/userDm";

export interface UsersRepository {
  currentUser: UserDm;
  getCurrentUser (): Promise<UserDm>;
}
