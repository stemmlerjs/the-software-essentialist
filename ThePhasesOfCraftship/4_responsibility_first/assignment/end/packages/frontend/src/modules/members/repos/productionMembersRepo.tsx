import { makeAutoObservable } from "mobx";
import { MemberDm } from "../domain/memberDm";
import { MembersRepo } from "./membersRepo";

export class ProductionMembersRepo implements MembersRepo {
  public member: MemberDm | null;

  constructor () {
    makeAutoObservable(this);
    this.member = null;
  }

  async getCurrentMember(): Promise<MemberDm | null> {
    // TODO: Implement
    return this.member
  }

  save (member: MemberDm): void {
    this.member = member;
  }
}