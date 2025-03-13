
import { UseCase } from "@dddforum/core";
import { VoteRepository } from "../../../../votes/repos/ports/voteRepository";
import { ApplicationErrors } from "@dddforum/errors/application";
import { MembersRepository } from "../../../../members/repos/ports/membersRepository";
import { Member } from "../../../../members/domain/member";
import { Commands  } from "@dddforum/api/votes";

// TODO: Consider ApplicationErrors.NotFoundError<Member>;
type UpdateMemberReputationScoreResponse = Member | ApplicationErrors.NotFoundError;

// Note: This is also something which could be done on a cron job
// We could have a cron job that runs every 24 hours and updates the reputation score of all members using 
// the read models. This would be a good way to ensure that the reputation score is always up to date.

export class UpdateMemberReputationScore implements UseCase<Commands.UpdateMemberReputationScoreCommand, UpdateMemberReputationScoreResponse> {
  constructor(
    private memberRepository: MembersRepository,
    private votesRepository: VoteRepository
  ) {}

  async execute(request: Commands.UpdateMemberReputationScoreCommand): Promise<UpdateMemberReputationScoreResponse> {
    const { memberId } = request.props;

    const [ memberOrNull, commentVotesRoundup, postVotesRoundup ] = await Promise.all([
      this.memberRepository.getMemberById(memberId),
      this.votesRepository.getMemberCommentVotesRoundup(memberId),
      this.votesRepository.getMemberPostVotesRoundup(memberId)
    ]);

    if (memberOrNull === null) {
      return new ApplicationErrors.NotFoundError('member');
    }

    // Get the current score from the read models for this member to calculate
    // We calculate the score by:
    // - all comment upvotes not owned by this member (score)
    // - all post upvotes not owned by this member (score)
    let newScore = commentVotesRoundup.getScore() 
      + postVotesRoundup.getScore();

    // This is another great example and reason for why we need read models.
    // More optimized queries.

    memberOrNull.updateReputationScore(newScore);

    await this.memberRepository.saveAggregateAndEvents(memberOrNull, memberOrNull.getDomainEvents());

    // There's a chance that the member's reputation level has changed as a result of the 
    // new score as well.
    // await this.eventBus.publishEvents(memberOrNull.getDomainEvents());

    return memberOrNull;
  }
  
}
