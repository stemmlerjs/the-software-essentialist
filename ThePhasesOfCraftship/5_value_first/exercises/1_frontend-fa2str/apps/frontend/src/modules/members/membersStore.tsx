import { makeAutoObservable } from "mobx";
import { MemberDm } from "./domain/memberDm";
import { APIClient, Members } from "@dddforum/api";

interface CreateMemberProps {
  username: string;
  email: string;
  userId: string;
  idToken: string;
  allowMarketing?: boolean;
}

export class MembersStore {
  public member: MemberDm | null;

  constructor(public apiClient: APIClient) {
    makeAutoObservable(this);
    this.member = null;
  }

  async getCurrentMember(): Promise<MemberDm | null> {
    return this.member;
  }

  save(member: MemberDm): void {
    this.member = member;
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
          userId: props.userId,
          reputationLevel: registerMemberResponse.data.reputationLevel
        });

        this.save(member);
        return { success: true };
      }

      return registerMemberResponse;
    } catch (error) {
      return { 
        success: false, 
        error: { message: "" } // Return error object with empty message
      };
    }
  }
}