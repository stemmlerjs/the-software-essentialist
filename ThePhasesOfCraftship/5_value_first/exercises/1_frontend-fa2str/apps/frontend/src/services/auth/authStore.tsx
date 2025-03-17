import { makeAutoObservable } from "mobx";
import { UserDm } from "@/modules/members/domain/userDm";
import { MemberDm } from "@/modules/members/domain/memberDm";
import { APIClient, Members } from "@dddforum/api";
import { FirebaseAPI } from "@/modules/members/firebaseAPI";

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
  ) {
    makeAutoObservable(this);
    this.initialize();
  }

  private async initialize() {
    try {
      const user = await this.firebaseAPI.getCurrentUser();
      if (user) {
        const idToken = await this.firebaseAPI.getAuthToken();
        this.currentUser = user;
        this.idToken = idToken;
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      this.error = 'Failed to initialize auth';
    } finally {
      this.isLoading = false;
    }
  }

  hasCompletedOnboarding () {
    // We know if they've completed onboarding if we also have their member details in the
    // store.
    return !(this.currentMember === null)
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
      const idToken = await this.firebaseAPI.getAuthToken();
      
      this.currentUser = user;
      this.idToken = idToken;
      return user;
    } catch (error) {
      this.error = 'Failed to sign in with Google';
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async logout(): Promise<void> {
    try {
      this.isLoading = true;
      await this.firebaseAPI.signOut();
      
      // Clear all state
      this.currentUser = null;
      this.currentMember = null;
      this.idToken = null;
      this.authToken = null;
      this.error = null;
    } catch (error) {
      console.error('Logout error:', error);
      this.error = 'Failed to logout';
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  getToken(): string | null {
    return this.idToken;
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