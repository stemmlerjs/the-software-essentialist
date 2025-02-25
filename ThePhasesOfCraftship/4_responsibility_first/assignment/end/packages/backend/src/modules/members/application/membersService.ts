
import { UserIdentityService } from "../../users/application/userIdentityService";
import { CreateMemberCommand } from "../memberCommands";
import { MembersRepository } from "../repos/ports/membersRepository";
import { CreateMember } from "./useCases/createMember/createMember";

export class MemberService {
  constructor(
    private membersRepository: MembersRepository,
    private usersService: UserIdentityService
  ) {}

  public createMember (command: CreateMemberCommand) {
    return new CreateMember(this.usersService, this.membersRepository).execute(command)
  }
  
}
