import { makeAutoObservable, runInAction } from "mobx";
import { UserDm } from "@/modules/members/domain/userDm";
import { MemberDm } from "@/modules/members/domain/memberDm";
import { APIClient, Members } from "@dddforum/api";
import { FirebaseAPI } from "@/modules/members/firebaseAPI";
import { LocalStorageAPI } from "@/shared/storage/localStorageAPI";

interface CreateMemberProps {
  username: string;
  email: string;
  userId: string;
  idToken: string;
  allowMarketing?: boolean;
}

export class AuthStore {
  isLoading: boolean = true;
  currentUser: UserDm | null = null;
  currentMember: MemberDm | null = null;
  idToken: string | null = null;
  authToken: string | null = null;
  error: string | null = null;

  constructor(
    private apiClient: APIClient,
    private firebaseAPI: FirebaseAPI,
    private localStorageAPI: LocalStorageAPI
  ) {
    makeAutoObservable(this);
    this.initialize();
  }

  private async initialize() {
    try {
      const user = await this.firebaseAPI.getCurrentUser();
      this.currentUser = user;
      this.isLoading = false;
    } catch (error) {
      this.currentUser = null;
      this.isLoading = false;
    }
  }

  getCurrentUser(): UserDm | null {
    if (this.isLoading) {
      return null;
    }
    return this.currentUser;
  }

  async getCurrentMember(): Promise<MemberDm | null> {
    return this.currentMember;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  saveMemberDetails (member: MemberDm) {
    this.currentMember = member;
  }

  saveUserDetails (user: UserDm) {
    this.currentUser = user;
  }

  async signInWithGoogle(): Promise<UserDm> {
    try {
      this.isLoading = true;
      this.error = null;
      const user = await this.firebaseAPI.signInWithGoogle();
      this.saveUser(user);
      return user;
    } catch (error) {
      this.setError('Failed to sign in with Google');
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.firebaseAPI.signOut();
      this.setCurrentUser(null);
      this.localStorageAPI.remove('currentUser');
      window.location.href = '/';
    } catch (error) {
      this.setError('Failed to sign out');
      console.error('Sign out error:', error);
    }
  }

  setCurrentUser(user: UserDm | null) {
    this.currentUser = user;
  }

  setError(error: string | null) {
    this.error = error;
  }

  saveUser(user: UserDm): void {
    this.currentUser = user;
    if (this.isAuthenticated()) {
      this.localStorageAPI.store('currentUser', user.toLocalStorage());
    }
  }

  getToken(): string | null {
    return this.localStorageAPI.retrieve('idToken');
  }

  async createMember(props: CreateMemberProps): Promise<Members.API.CreateMemberAPIResponse> {
    try {
      const registerMemberResponse = await this.apiClient.members.create({
        username: props.username,
        email: props.email,
        userId: props.userId
      }, props.idToken);

      if (props.allowMarketing) {
        await this.apiClient.marketing.addEmailToList(props.email);
      }

      if (registerMemberResponse.success && registerMemberResponse.data) {
        const member = new MemberDm({
          id: registerMemberResponse.data.memberId,
          username: props.username,
          email: props.email,
          userId: props.userId
        });

        this.currentMember = member;
        return { success: true };
      }

      return registerMemberResponse;
    } catch (error) {
      return { 
        success: false, 
        error: { message: "" }
      };
    }
  }
} 