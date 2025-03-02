import { MemberDm } from "../domain/memberDm";

export class ProductionMembersRepo implements MembersRepo {
  save (save: MemberDm): void {
    
  }
}

export interface MembersRepo {
  save (save: MemberDm): void;
}