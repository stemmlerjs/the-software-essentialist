import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  signInWithPopup, GoogleAuthProvider, UserCredential
} from 'firebase/auth';

const auth = getAuth();
const provider = new GoogleAuthProvider();

export class FirebaseService {
  private auth;

  constructor() {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      // ... other config
    };

    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
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

  public async getCurrentUser(): Promise<FirebaseUser | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }

  public async signInWithGoogle () {
    return signInWithPopup(auth, provider);
  }

  public async signIn(email: string, password: string): Promise<FirebaseUser> {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    return result.user;
  }

  public async signOut(): Promise<void> {
    await signOut(this.auth);
  }
}