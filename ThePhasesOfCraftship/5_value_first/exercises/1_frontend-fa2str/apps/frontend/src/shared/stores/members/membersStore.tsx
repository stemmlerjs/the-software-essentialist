
import { makeAutoObservable } from "mobx";
import { MemberDm } from "./memberDm";

export class MembersStore {
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