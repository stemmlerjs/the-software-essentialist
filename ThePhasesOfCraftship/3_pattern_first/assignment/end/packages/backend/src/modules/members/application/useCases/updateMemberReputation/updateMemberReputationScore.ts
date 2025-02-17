
import { UseCase } from "@dddforum/shared/src/core/useCase";
import { MembersRepository } from "../../../repos/ports/membersRepository";
import { EventBus } from "../../../../../shared/eventBus/ports/eventBus";
import { MemberNotFoundError } from "@dddforum/shared/src/errors";
import { Member } from "../../../domain/member";
import { UpdateMemberReputationScoreCommand } from "../../../memberCommands";
import { VoteRepository } from "../../../../comments/repos/ports/voteRepository";

type UpdateMemberReputationScoreResponse = Member | MemberNotFoundError;

// Note: This is also something which could be done on a cron job
// We could have a cron job that runs every 24 hours and updates the reputation score of all members using 
// the read models. This would be a good way to ensure that the reputation score is always up to date.

export class UpdateMemberReputationScore implements UseCase<UpdateMemberReputationScoreCommand, UpdateMemberReputationScoreResponse> {
  constructor(
    private memberRepository: MembersRepository,
    private votesRepository: VoteRepository,
    private eventBus: EventBus
  ) {}

  async execute(request: UpdateMemberReputationScoreCommand): Promise<UpdateMemberReputationScoreResponse> {
    const { memberId } = request.props;

    const [ memberOrNull, commentVotesRoundup, postVotesRoundup ] = await Promise.all([
      this.memberRepository.getMemberById(memberId),
      this.votesRepository.getMemberCommentVotesRoundup(memberId),
      this.votesRepository.getMemberPostVotesRoundup(memberId)
    ]);

    if (memberOrNull === null) {
      return new MemberNotFoundError();
    }

    // Get the current score from the read models for this member to calculate
    // We calculate the score by:
    // - all comment upvotes not owned by this member (score)
    // - all post upvotes not owned by this member (score)
    let newScore = commentVotesRoundup.getScore() 
      + postVotesRoundup.getScore()
      + memberOrNull.reputationScore;

    // This is another great example and reason for why we need read models.
    // More optimized queries.

    memberOrNull.updateReputationScore(newScore);

    await this.memberRepository.save(memberOrNull);

    // There's a chance that the member's reputation level has changed as a result of the 
    // new score as well.
    await this.eventBus.publishEvents(memberOrNull.getDomainEvents());

    return memberOrNull;
  }
  
}
