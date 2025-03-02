import { makeAutoObservable } from "mobx";
import { APIClient, CreateUserParams, CreateUserResponse } from "@dddforum/shared/src/api/users";
import { UserDm } from "../domain/userDm";
import { LocalStorage } from "../../../shared/storage/localStorage";
import { FirebaseService } from "../externalServices/firebaseService";

export class AuthRepository {
  currentUser: UserDm | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private api: APIClient,
    private localStorage: LocalStorage,
    private firebaseService: FirebaseService
  ) {
    makeAutoObservable(this);
    this.initialize();
  }

  private async initialize() {
    try {
      const user = await this.getCurrentUser();
      if (user) {
        this.setCurrentUser(user);
      }
    } catch (error) {
      this.setError('Failed to initialize auth');
    } finally {
      this.isLoading = false;
    }
  }

  setCurrentUser(user: UserDm | null) {
    this.currentUser = user;
  }

  setError(error: string | null) {
    this.error = error;
  }

  get isAuthenticated() {
    return !!this.currentUser;
  }

  async register(input: CreateUserParams): Promise<CreateUserResponse> {
    return this.api.members.create(input);
  }

  async getCurrentUser(): Promise<UserDm | null> {
    const savedUser = this.localStorage.get('user');
    if (savedUser) {
      return UserDm.fromJSON(savedUser);
    }
    return null;
  }

  async signOut() {
    try {
      await this.firebaseService.signOut();
      this.setCurrentUser(null);
      this.localStorage.remove('user');
      window.location.href = '/';
    } catch (error) {
      this.setError('Failed to sign out');
      console.error('Sign out error:', error);
    }
  }
} 