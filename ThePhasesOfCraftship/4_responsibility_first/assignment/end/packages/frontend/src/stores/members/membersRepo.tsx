import { MemberDm } from "./memberDm";

export interface MembersRepo {
  member: MemberDm | null;
  getCurrentMember (): Promise<MemberDm | null>;
  save (save: MemberDm): void;
}