import { makeAutoObservable } from "mobx";
import { UserDm } from "../domain/userDm";
import { LocalStorage } from "../../../shared/storage/localStorage";
import { FirebaseService } from "../externalServices/firebaseService";
import { UsersRepository } from "./usersRepo";

export class AuthRepository implements UsersRepository {
  private readonly TOKEN_KEY = 'auth_token';
  currentUser: UserDm | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
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

  isAuthenticated() {
    return !!this.currentUser;
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
      await this.firebaseService.signOut();
      this.setCurrentUser(null);
      this.localStorage.remove('currentUser');
      window.location.href = '/';
    } catch (error) {
      this.setError('Failed to sign out');
      console.error('Sign out error:', error);
    }
  }

  public save(user: UserDm): void {
    this.currentUser = user;
    if (user.isAuthenticated()) {
      this.localStorage.store('currentUser', user.toLocalStorage());
    }
  }

  private async loadInitialUserState(): Promise<void> {
    try {
      const rawUser = this.localStorage.retrieve('currentUser');
      const isAuthenticated = await this.firebaseService.isAuthenticated();
      
      if (rawUser && isAuthenticated) {
        const firebaseUser = await this.firebaseService.getCurrentUser();
        
        if (firebaseUser) {
          const user = UserDm.fromFirebaseUser(firebaseUser);
          this.localStorage.store('currentUser', user.toLocalStorage());
          this.currentUser = user;
          return;
        }
      }

      // If we get here, either there's no stored user, no Firebase user,
      // or authentication failed - clean up and set unauthenticated user
      this.localStorage.remove('currentUser');
      this.currentUser = new UserDm({ 
        isAuthenticated: false, 
        username: '', 
        userRoles: [] 
      });
      
    } catch (error) {
      // Handle any errors by setting unauthenticated user
      console.error('Error loading initial user state:', error);
      this.localStorage.remove('currentUser');
      this.currentUser = new UserDm({ 
        isAuthenticated: false, 
        username: '', 
        userRoles: [] 
      });
    }
  }

  getToken(): string | null {
    // TODO: we should use authToken instead lik the static method defined
    return this.localStorage.retrieve('currentUser');
  }
} 