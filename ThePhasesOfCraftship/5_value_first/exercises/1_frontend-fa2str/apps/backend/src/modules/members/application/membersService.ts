
import { MembersRepository } from "../repos/ports/membersRepository";
import { CreateMember } from "./useCases/createMember/createMember";
import { Commands } from '@dddforum/api/members'

export class MemberService {
  constructor(
    private membersRepository: MembersRepository
  ) {}

  public createMember (command: Commands.CreateMemberCommand) {
    return new CreateMember(this.membersRepository).execute(command)
  }
  
}
