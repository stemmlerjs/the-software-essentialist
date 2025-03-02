import { MemberDm } from "../domain/memberDm";

export interface MembersRepo {
  save (save: MemberDm): void;
}