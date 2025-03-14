import { makeAutoObservable } from "mobx";
import { MemberDm } from "./memberDm";
import { MembersRepo } from "./membersRepo";
import { apiClient } from "../../../main";
import { Members } from "@dddforum/api";

interface CreateMemberProps {
  username: string;
  email: string;
  userId: string;
  idToken: string;
  allowMarketing?: boolean;
}

export class MembersStore implements MembersRepo {
  public member: MemberDm | null;

  constructor() {
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
      const registerMemberResponse = await apiClient.members.create({
        username: props.username,
        email: props.email,
        userId: props.userId
      }, props.idToken);

      if (props.allowMarketing) {
        await apiClient.marketing.addEmailToList(props.email);
      }

      if (registerMemberResponse.success && registerMemberResponse.data) {
        const member = new MemberDm({
          id: registerMemberResponse.data.memberId,
          username: props.username,
          email: props.email,
          userId: props.userId
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