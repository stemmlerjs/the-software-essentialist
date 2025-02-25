import { fail, success, UseCase, UseCaseResponse } from "@dddforum/shared/src/core/useCase";
import { MembersRepository } from "../../../repos/ports/membersRepository";
import { Member } from "../../../domain/member";
import { CreateMemberCommand } from "../../../memberCommands";
import { UsersService } from "../../../../users/application/usersService";
import { ValidationError } from "@dddforum/shared/src/errors";

// Improvement: These errors can be generalized as 'NotFound' errors, like 'MemberNotFound', 'CommentNotFound', etc.
// This way, we can have a single error type for all 'NotFound' errors.
// This is a good example of the 'Generalize Error' refactoring technique.
class MemberAlreadyExistsError {}

export class MemberUsernameTaken extends Error {
  constructor() {
    super();
    this.name = 'MemberUsernameTaken';
  }
}

type CreateMemberResponse = UseCaseResponse<Member | undefined, ValidationError | MemberUsernameTaken>;

export class CreateMember implements UseCase<CreateMemberCommand, CreateMemberResponse> {
  constructor(
    private userService: UsersService,
    private memberRepository: MembersRepository
  ) {}

  async execute(request: CreateMemberCommand): Promise<CreateMemberResponse> {
    const { username, email, userId, allowMarketingEmails } = request.props;
    let existingMember: Member | null =  null;

    // Check if user already exists; if they do, then we will just return 
    // them and not do anything else. All good.
    existingMember = await this.memberRepository.getMemberByUserId(userId);
    if (existingMember) {
      return success(existingMember);
    }

    // Check if username is taken
    existingMember = await this.memberRepository.findUserByUsername(username);
    if (existingMember) {
      return fail(new MemberUsernameTaken());
    }

    // Create member
    const memberOrError = Member.create({
      username,
      userId,
    });

    if (memberOrError instanceof ValidationError) {
      return fail(memberOrError);
    }

    // Save member
    await this.memberRepository.saveAggregateAndEvents(memberOrError, memberOrError.getDomainEvents());

    return success(memberOrError);
  }
}
