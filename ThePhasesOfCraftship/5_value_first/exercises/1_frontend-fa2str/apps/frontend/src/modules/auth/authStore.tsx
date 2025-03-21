import { makeAutoObservable } from "mobx";

import { APIClient, Members } from "@dddforum/api";
import { FirebaseAPI } from "./firebaseAPI";
import { UserDm } from "./domain/userDm";
import { MemberDm } from "./domain/memberDm";

interface CreateMemberProps {
  username: string;
  email: string;
  userId: string;
  idToken: string;
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
      this.currentUser = user;

      if (user) {
        const idToken = await this.firebaseAPI.getAuthToken();
        this.idToken = idToken;
      }

      if (this.idToken) {
        const member = await this.loadMemberDetails();
        this.currentMember = member;
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      this.error = 'Failed to initialize auth';
    } finally {
      this.isLoading = false;
    }
  }

  private async loadMemberDetails () {
    try {
      if (!this.idToken) {
        return null;
      }

      if (!this.currentUser) {
        return null;
      }
  
      const response = await this.apiClient.members.getMemberDetails(this.idToken);
      
      if (response.success && response.data) {
        return new MemberDm({
          id: response.data.memberId,
          username: response.data.username,
          email: this.currentUser?.email,
          userId: response.data.userId,
          reputationLevel: response.data.reputationLevel
        });
      }
  
      return null;
    } catch (err) {
      console.error('Failed to load member details:', err);
      return null;
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

      if (registerMemberResponse.success && registerMemberResponse.data) {
        const member = new MemberDm({
          id: registerMemberResponse.data.memberId,
          username: props.username,
          email: props.email,
          userId: props.userId,
          reputationLevel: registerMemberResponse.data.reputationLevel
        });

        this.currentMember = member;
        return { success: true };
      }

      return registerMemberResponse;
    } catch (error) {
      console.log(error);
      return { 
        success: false, 
        error: { message: "" }
      };
    }
  }
} 