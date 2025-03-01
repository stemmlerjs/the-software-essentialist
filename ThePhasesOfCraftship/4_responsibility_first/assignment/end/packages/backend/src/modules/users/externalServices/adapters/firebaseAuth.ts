import { NotFoundError } from "@dddforum/shared/src/errors";
import { User } from "../../domain/user";
import { IdentityServiceAPI } from "../ports/identityServiceAPI";
import { auth } from "firebase-admin";
import path from "path";
import { initializeApp, cert } from 'firebase-admin/app';


export class FirebaseAuth implements IdentityServiceAPI {
  private firebaseAuth: auth.Auth;

  constructor() {
    this.initialize();
    this.firebaseAuth = auth();
  }

  initialize () {
    initializeApp({
      credential: cert(require(path.join(__dirname, '../../../../../service-key.json')))
    });
  }

  async getUserById(userId: string): Promise<User | NotFoundError> {
    try {
      const userRecord = await this.firebaseAuth.getUser(userId);
      return {
        id: userRecord.uid,
        email: userRecord.email || '',
        emailVerified: userRecord.emailVerified,
        name: userRecord.displayName || ''
      };
    } catch (error) {
      if ((error as any).code === 'auth/user-not-found') {
        return new NotFoundError();
      }
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<User | NotFoundError> {
    try {
      const userRecord = await this.firebaseAuth.getUserByEmail(email);
      return {
        id: userRecord.uid,
        email: userRecord.email || '',
        emailVerified: userRecord.emailVerified,
        name: userRecord.displayName || ''
      };
    } catch (error) {
      if ((error as any).code === 'auth/user-not-found') {
        return new NotFoundError();
      }
      throw error;
    }
  }
}
