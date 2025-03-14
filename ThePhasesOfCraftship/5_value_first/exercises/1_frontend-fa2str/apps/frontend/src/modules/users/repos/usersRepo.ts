import { Users } from "@dddforum/api";
import { UserDm } from "../domain/userDm";

export interface UsersRepository {
  currentUser: UserDm | null;
  isLoading: boolean;
  error: string | null;
  
  setCurrentUser(user: UserDm | null): void;
  setError(error: string | null): void;
  isAuthenticated(): boolean;
  getCurrentUser(): Promise<UserDm | null>;
  signOut(): Promise<void>;
  save(user: UserDm): void;
  getToken(): string | null;
  register(registrationDetails: Users.CreateUserParams): Promise<any>;
} 