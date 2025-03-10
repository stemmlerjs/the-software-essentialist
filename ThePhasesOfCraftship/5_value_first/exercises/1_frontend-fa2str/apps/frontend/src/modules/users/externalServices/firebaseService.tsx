import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  signInWithPopup, 
  GoogleAuthProvider, 
  UserCredential
} from 'firebase/auth';

export class FirebaseService {
  private auth;
  private provider;

  constructor() {
    const requiredEnvVars = [
      'VITE_FIREBASE_API_KEY',
      'VITE_FIREBASE_AUTH_DOMAIN', 
      'VITE_FIREBASE_PROJECT_ID'
    ];

    requiredEnvVars.forEach(envVar => {
      if (!import.meta.env[envVar]) {
        console.log(`Missing required environment variable: ${envVar}`)
        throw new Error(`Missing required environment variable: ${envVar}`);
      }
    });

    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    };

    const app = initializeApp(firebaseConfig);
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

  public async getCurrentUser(): Promise<FirebaseUser | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }

  public async signInWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(this.auth, this.provider);
  }

  public async signIn(email: string, password: string): Promise<FirebaseUser> {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    return result.user;
  }

  public async signOut(): Promise<void> {
    await signOut(this.auth);
  }
}