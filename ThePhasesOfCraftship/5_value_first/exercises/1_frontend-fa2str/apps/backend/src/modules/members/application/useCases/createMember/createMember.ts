import { Result, UseCase } from "@dddforum/core";
import { MembersRepository } from "../../../repos/ports/membersRepository";
import { Member } from "../../../domain/member";
import { ApplicationErrors } from "@dddforum/errors/application";
import { Commands } from "@dddforum/api/members"

// Improvement: These errors can be generalized as 'NotFound' errors, like 'MemberNotFound', 'CommentNotFound', etc.
// This way, we can have a single error type for all 'NotFound' errors.
// This is a good example of the 'Generalize Error' refactoring technique.

// TODO: Move these and generalize thm
class MemberAlreadyExistsError {}

// TODO: Conflict type of error
export class MemberUsernameTaken extends Error {
  constructor() {
    super();
    this.name = 'MemberUsernameTaken';
  }
}

// TODO: Not found error
export class UserIdentityNotFound extends Error {
  constructor() {
    super();
    this.name = 'UserIdentityNotFound';
  }
}

export type CreateMemberError = 
  | ApplicationErrors.ValidationError 
  | MemberUsernameTaken 
  | UserIdentityNotFound;

export class CreateMember implements UseCase<Commands.CreateMemberCommand, Result<Member, CreateMemberError>> {
  constructor(
    private memberRepository: MembersRepository
  ) {}

  async execute(request: Commands.CreateMemberCommand): Promise<Result<Member, CreateMemberError>> {
    const { username, userId } = request.props;
    let existingMember: Member | null = null;

    existingMember = await this.memberRepository.getMemberByUserId(userId);
    if (existingMember) {
      return Result.success(existingMember);
    }

    existingMember = await this.memberRepository.findUserByUsername(username);
    if (existingMember) {
      return Result.failure(new MemberUsernameTaken());
    }

    const memberOrError = Member.create({
      username,
      userId,
    });

    if (memberOrError instanceof ApplicationErrors.ValidationError) {
      return Result.failure(memberOrError);
    }

    await this.memberRepository.saveAggregateAndEvents(memberOrError, memberOrError.getDomainEvents());

    return Result.success(memberOrError);
  }
}
