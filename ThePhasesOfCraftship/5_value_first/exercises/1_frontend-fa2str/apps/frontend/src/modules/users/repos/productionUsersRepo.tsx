import { APIClient, Users } from "@dddforum/api"
import { UserDm } from "../domain/userDm";
import { makeAutoObservable } from "mobx";
import { UsersRepository } from "./usersRepo";
import { LocalStorage } from "../../../shared/storage/localStorage";
import { AuthService } from "../ports/authService";

export class ProductionUsersRepository implements UsersRepository {
  private readonly TOKEN_KEY = 'auth_token';
  public api: APIClient;
  public currentUser: UserDm | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor (
    api: APIClient, 
    private localStorage: LocalStorage, 
    private authService: AuthService
  ) {
    makeAutoObservable(this);
    this.api = api;
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

  isAuthenticated() {
    return !!this.currentUser;
  }

  public save(user: UserDm): void {
    this.currentUser = user;
    if (user.isAuthenticated()) {
      this.localStorage.store('currentUser', user.toLocalStorage());
    }
  }

  async getCurrentUser(): Promise<UserDm | null> {
    const savedUser = this.localStorage.retrieve('currentUser');
    if (savedUser) {
      return UserDm.fromLocalStorage(savedUser);
    }
    return null;
  }

  async signOut() {
    try {
      await this.authService.signOut();
      this.setCurrentUser(null);
      this.localStorage.remove('currentUser');
      window.location.href = '/';
    } catch (error) {
      this.setError('Failed to sign out');
      console.error('Sign out error:', error);
    }
  }

  private async loadInitialUserState(): Promise<void> {
    try {
      const rawUser = this.localStorage.retrieve('currentUser');
      const isAuthenticated = await this.authService.isAuthenticated();
      
      if (rawUser && isAuthenticated) {
        const user = await this.authService.getCurrentUser();
        if (user) {
          this.localStorage.store('currentUser', user.toLocalStorage());
          this.currentUser = user;
          return;
        }
      }

      // If we get here, either there's no stored user, no Firebase user,
      // or authentication failed - clean up and set unauthenticated user
      this.localStorage.remove('currentUser');
      this.currentUser = null;
    } catch (error) {
      console.error('Error loading initial user state:', error);
      this.localStorage.remove('currentUser');
      this.currentUser = null;
    }
  }

  getToken(): string | null {
    return this.localStorage.retrieve('currentUser');
  }

  public register(registrationDetails: Users.CreateUserParams) {
    return this.api.users.register(registrationDetails);
  }
}
