
import { makeAutoObservable } from "mobx";
import { MemberDm } from "./memberDm";
import { MembersRepo } from "./membersRepo";

export class MembersStore implements MembersRepo {
  public member: MemberDm | null;

  constructor () {
    makeAutoObservable(this);
    this.member = null;
  }

  async getCurrentMember(): Promise<MemberDm | null> {
    return this.member;
  }

  save (member: MemberDm): void {
    this.member = member;
  }
}