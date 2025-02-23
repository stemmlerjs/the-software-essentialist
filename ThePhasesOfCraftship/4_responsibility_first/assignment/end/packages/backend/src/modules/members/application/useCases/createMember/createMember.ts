
import { UseCase } from "@dddforum/shared/src/core/useCase";
import { MembersRepository } from "../../../repos/ports/membersRepository";
import { Member } from "../../../domain/member";
import { CreateMemberCommand } from "../../../memberCommands";
import { UsersService } from "../../../../users/usersService";

// Improvement: These errors can be generalized as 'NotFound' errors, like 'MemberNotFound', 'CommentNotFound', etc.
// This way, we can have a single error type for all 'NotFound' errors.
// This is a good example of the 'Generalize Error' refactoring technique.
class MemberAlreadyExistsError {}

class MemberUsernameTaken {}

type CreateMemberResponse = Member | MemberUsernameTaken | MemberAlreadyExistsError;

export class CreateMember implements UseCase<CreateMemberCommand, CreateMemberResponse> {
  constructor(
    private userService: UsersService,
    private memberRepository: MembersRepository
  ) {}

  async execute(request: CreateMemberCommand): Promise<CreateMemberResponse> {
    throw new Error('Not yet implemented')
  }
  
}
