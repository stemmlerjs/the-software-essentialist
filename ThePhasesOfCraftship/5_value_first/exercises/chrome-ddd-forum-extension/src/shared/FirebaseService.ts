
import { Storage } from "./Storage";
import firebase from 'firebase/app';

export class FirebaseService {
  private storage: Storage;

  constructor (storage: Storage) {
    this.storage = storage;
    this.init();
  }

  private init () {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID
    };
    
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  async hasTokenInStorage (): Promise<boolean> { 
    try {
      const token = await this.storage.get('firebaseAuthToken') as firebase.FirebaseIdToken
      if (token) {
        return true;
      } 
    } catch (err) {}
    return false;
  }

  async getTokenFromStorage () {
    const result = await this.storage.get('firebaseAuthToken') as firebase.FirebaseIdToken | null;
    if (result) return result.firebaseAuthToken;
    return null;
  }
}

