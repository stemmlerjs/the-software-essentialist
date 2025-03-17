import { initializeApp, FirebaseOptions } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup, 
  GoogleAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { UserDm } from './domain/userDm';


export interface FirebaseAPI {
  isAuthenticated(): Promise<boolean>;
  getCurrentUser(): Promise<UserDm | null>;
  signInWithGoogle(): Promise<UserDm>;
  signIn(email: string, password: string): Promise<UserDm>;
  signOut(): Promise<void>;
  getAuthToken(): Promise<string | null>;
}

export class FirebaseAPIClient {
  private auth;
  private provider;

  constructor(config: FirebaseOptions) {
    this.provider = new GoogleAuthProvider();
    this.auth = this.initialize(config);
  }

  public initialize (config: FirebaseOptions) {
    const app = initializeApp(config);
    return getAuth(app);
  }

  public async isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      // Using onAuthStateChanged to properly check auth state
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe(); // Unsubscribe immediately after first check
        resolve(!!user);
      });
    });
  }

  public async getCurrentUser(): Promise<UserDm | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe();
        resolve(user ? UserDm.fromFirebaseUser(user) : null);
      });
    });
  }

  public async signInWithGoogle(): Promise<UserDm> {
    const userCredential = await signInWithPopup(this.auth, this.provider);
    return UserDm.fromFirebaseUser(userCredential.user);
  }

  public async signIn(email: string, password: string): Promise<UserDm> {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    return UserDm.fromFirebaseUser(result.user);
  }

  public async signOut(): Promise<void> {
    await signOut(this.auth);
  }

  public async getAuthToken(): Promise<string | null> {
    const current = this.auth.currentUser;
    if (!current) {
      return null;
    }
    // Now we can use Firebase's built-in method:
    return await current.getIdToken();
  }

  public async authenticateWithStoredToken() {
    const auth = getAuth();
    const idToken = localStorage.getItem('idToken');
    
    if (!idToken) {
      throw new Error('No ID token found');
    }

    try {
      // For Google Auth:
      const credential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, credential);
      return result.user;
    } catch (error) {
      console.error('Authentication error:', error);
      // Token might be expired or invalid
      localStorage.removeItem('idToken');
      throw error;
    }
  }
}