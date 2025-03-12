
import { fail, success, UseCase, UseCaseResponse } from "@dddforum/core";
import { MembersRepository } from "../../../repos/ports/membersRepository";
import { Member } from "../../../domain/member";
import { ApplicationErrors } from "@dddforum/errors";
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

type CreateMemberResponse = UseCaseResponse<Member | undefined, 
  ApplicationErrors.ValidationError 
  | MemberUsernameTaken 
  | UserIdentityNotFound>;

export class CreateMember implements UseCase<Commands.CreateMemberCommand, CreateMemberResponse> {
  constructor(
    private memberRepository: MembersRepository
  ) {}

  async execute(request: Commands.CreateMemberCommand): Promise<CreateMemberResponse> {
    const { username, userId } = request.props;
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

    if (memberOrError instanceof ApplicationErrors.ValidationError) {
      return fail(memberOrError);
    }

    // Save member
    await this.memberRepository.saveAggregateAndEvents(memberOrError, memberOrError.getDomainEvents());

    return success(memberOrError);
  }
}
