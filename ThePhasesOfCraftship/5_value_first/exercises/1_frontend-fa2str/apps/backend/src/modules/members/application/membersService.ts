import { MembersRepository } from "../repos/ports/membersRepository";
import { CreateMember } from "./useCases/createMember/createMember";
import { Commands } from '@dddforum/api/members';
import { Result } from "@dddforum/core";
import { Member } from "../domain/member";
import { CreateMemberError } from "./useCases/createMember/createMember";

export class MemberService {
  constructor(
    private membersRepository: MembersRepository
  ) {}

  public createMember(command: Commands.CreateMemberCommand): Promise<Result<Member, CreateMemberError>> {
    return new CreateMember(this.membersRepository).execute(command);
  }
}
