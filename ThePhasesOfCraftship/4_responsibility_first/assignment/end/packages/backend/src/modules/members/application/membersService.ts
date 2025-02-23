
import { MembersRepository } from "../repos/ports/membersRepository";
import { CreateMember } from "./useCases/createMember/createMember";

export class MemberService {
  constructor(
    private membersRepository: MembersRepository,
  ) {}

  public createMember () {
    // Not yet implemented
  }
  
}
