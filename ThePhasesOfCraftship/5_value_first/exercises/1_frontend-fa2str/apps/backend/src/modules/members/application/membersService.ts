
import { CreateMemberCommand } from "../memberCommands";
import { MembersRepository } from "../repos/ports/membersRepository";
import { CreateMember } from "./useCases/createMember/createMember";

export class MemberService {
  constructor(
    private membersRepository: MembersRepository
  ) {}

  public createMember (command: CreateMemberCommand) {
    return new CreateMember(this.membersRepository).execute(command)
  }
  
}
