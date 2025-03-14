import { AuthService } from '../ports/authService';
import { UserDm } from '../domain/userDm';

export class FakeAuthService implements AuthService {
  private user: UserDm | null = null;
  private authenticated = false;

  async isAuthenticated(): Promise<boolean> {
    return this.authenticated;
  }

  async getCurrentUser(): Promise<UserDm | null> {
    return this.user;
  }

  async signInWithGoogle(): Promise<UserDm> {
    // Just pretend we got a user
    const mockUser = UserDm.fromPrimitives({
      id: 'fake-user-id',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
    });
    this.user = mockUser;
    this.authenticated = true;
    return mockUser;
  }

  async signOut(): Promise<void> {
    this.user = null;
    this.authenticated = false;
  }

  public async getAuthToken(): Promise<string | null> {
    // Return a dummy token or null, if you prefer
    return this.authenticated ? "fake-auth-token" : null;
  }
} 