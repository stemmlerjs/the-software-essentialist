
import { ApplicationErrors, ServerErrors } from"@dddforum/errors/src";
import { UseCase } from "@dddforum/core/src";
import { MembersRepository } from "../../../../members/repos/ports/membersRepository";
import { CanVoteOnCommentPolicy } from "./canVoteOnComment";
import { CommentVote } from "../../../../comments/domain/commentVote";
import { CommentRepository } from "../../../../comments/repos/ports/commentRepository";
import { VoteRepository } from "../../../repos/ports/voteRepository";
import * as Votes from '@dddforum/api/src/votes'

type VoteOnCommentResponse = CommentVote 
  | ApplicationErrors.ValidationError 
  | ApplicationErrors.PermissionError 
  | ApplicationErrors.NotFoundError
  | ServerErrors.AnyServerError;

export class VoteOnComment implements UseCase<Votes.Commands.VoteOnCommentCommand, VoteOnCommentResponse> {

  constructor(
    private memberRepository: MembersRepository,
    private commentRepository: CommentRepository,
    private voteRepository: VoteRepository
  ) {}

  async execute(request: Votes.Commands.VoteOnCommentCommand): Promise<VoteOnCommentResponse> {
    let commentVote: CommentVote;
    const { memberId, commentId, voteType } = request.props;

    const [memberOrNull, commentOrNull, existingVoteOrNull] = await Promise.all([
      this.memberRepository.getMemberById(memberId),
      this.commentRepository.getCommentById(commentId),
      this.voteRepository.findVoteByMemberAndCommentId(memberId, commentId)
    ]);

    if (memberOrNull === null) {
      return new ApplicationErrors.NotFoundError('member')
    }

    if (commentOrNull === null) {
      return new ApplicationErrors.NotFoundError('comment')
    }

    if (!CanVoteOnCommentPolicy.isAllowed(memberOrNull)) {
      return new ApplicationErrors.PermissionError();
    }

    if (existingVoteOrNull) {
      commentVote = existingVoteOrNull
      
    } else {
      let commentVoteOrError = CommentVote.create(memberId, commentId);

      if (commentVoteOrError instanceof ApplicationErrors.ValidationError) {
        return commentVoteOrError;
      }
      commentVote = commentVoteOrError;
    }

    commentVote.castVote(voteType)

    try {
      const domainEvents = commentVote.getDomainEvents();
      
      await this.voteRepository.saveAggregateAndEvents(commentVote, domainEvents);

      return commentVote;
      
    } catch (error) {
      console.log(error);
      // TODO: Do this database error everywhere and test to make sure it's good
      return new ServerErrors.DatabaseError();
    }
  }
}
