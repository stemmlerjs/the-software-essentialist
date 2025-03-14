import { UserDm } from "../domain/userDm";

export interface AuthService {
  isAuthenticated(): Promise<boolean>;
  getCurrentUser(): Promise<UserDm | null>;
  signInWithGoogle(): Promise<UserDm>;
  getAuthToken(): Promise<string | null>;
  signOut(): Promise<void>;
}