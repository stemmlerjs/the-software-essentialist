import { makeAutoObservable } from 'mobx';
import { NavigateFunction } from 'react-router-dom';
import { UserDm } from '../../../modules/users/domain/userDm';
import { UsersRepository } from '../../../modules/users/repos/usersRepo';
import { FirebaseService } from '../../../modules/users/externalServices/firebaseService';

export class AuthStore {
  currentUser: UserDm | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private usersRepository: UsersRepository,
    private firebaseService: FirebaseService
  ) {
    makeAutoObservable(this);
    this.initialize();
  }

  private async initialize() {
    try {
      const isAuthenticated = await this.firebaseService.isAuthenticated();
      if (isAuthenticated) {
        const user = await this.usersRepository.getCurrentUser();
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
    return !!this.currentUser?.isAuthenticated();
  }

  async signInWithGoogle (navigate: NavigateFunction) {
    try {
      this.isLoading = true;
      this.error = null;

      const userCredential = await this.firebaseService.signInWithGoogle();
      const userDm = UserDm.fromFirebaseCredentials(userCredential);
      
      // Save to repository which handles local storage
      this.usersRepository.save(userDm);
      this.setCurrentUser(userDm);

      // Navigate to onboarding for registration
      navigate('/onboarding');
    } catch (error) {
      this.setError('Failed to sign in with Google');
      console.error('Auth error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async signOut() {
    try {
      await this.firebaseService.signOut();
      this.setCurrentUser(null);
      window.location.href = '/';
    } catch (error) {
      this.setError('Failed to sign out');
      console.error('Sign out error:', error);
    }
  }
} 