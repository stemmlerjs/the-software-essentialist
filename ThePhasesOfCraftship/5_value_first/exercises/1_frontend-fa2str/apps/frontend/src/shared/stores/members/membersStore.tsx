import { makeAutoObservable } from "mobx";
import { MemberDm } from "./memberDm";
import { MembersRepo } from "./membersRepo";
import { apiClient } from "../../../main";

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

  async createMember(props: CreateMemberProps): Promise<{ success: boolean; error?: string }> {
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

      return { 
        success: false, 
        error: registerMemberResponse.error || "Failed to register member" 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "An error occurred" 
      };
    }
  }
}