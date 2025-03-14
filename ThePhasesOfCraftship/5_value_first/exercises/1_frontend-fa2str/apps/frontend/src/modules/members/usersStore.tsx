import { Users } from "@dddforum/api";
import { UserDm } from "../domain/userDm.js";

export interface UsersStore {
  currentUser: UserDm | null;
  isLoading: boolean;
  error: string | null;
  
  setCurrentUser(user: UserDm | null): void;
  setError(error: string | null): void;
  isAuthenticated(): boolean;
  // TODO: this does too much
  getCurrentUser(): Promise<UserDm | null>;
  signOut(): Promise<void>;
  save(user: UserDm): void;
  getToken(): string | null;
  register(registrationDetails: Users.CreateUserParams): Promise<any>;
} 