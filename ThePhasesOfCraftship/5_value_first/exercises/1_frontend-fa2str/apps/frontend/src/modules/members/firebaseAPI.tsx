
import { initializeApp, FirebaseOptions } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup, 
  GoogleAuthProvider
} from 'firebase/auth';
import { UserDm } from './domain/userDm.js';

export class FirebaseAPI {
  private auth;
  private provider;

  constructor(config: FirebaseOptions) {
    const app = initializeApp(config);
    this.auth = getAuth(app);
    this.provider = new GoogleAuthProvider();
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
}