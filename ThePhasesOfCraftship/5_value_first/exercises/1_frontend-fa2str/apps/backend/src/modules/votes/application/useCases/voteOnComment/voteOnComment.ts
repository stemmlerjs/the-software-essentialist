import { ApplicationErrors } from "@dddforum/errors/application";
import { ServerErrors } from "@dddforum/errors/server";
import { Result, UseCase } from "@dddforum/core";
import { MembersRepository } from "../../../../members/repos/ports/membersRepository";
import { CanVoteOnCommentPolicy } from "./canVoteOnComment";
import { CommentVote } from "../../../../comments/domain/commentVote";
import { CommentRepository } from "../../../../comments/repos/ports/commentRepository";
import { VoteRepository } from "../../../repos/ports/voteRepository";
import * as Votes from '@dddforum/api/votes'

type VoteOnCommentError = 
  | ApplicationErrors.ValidationError 
  | ApplicationErrors.PermissionError 
  | ApplicationErrors.NotFoundError
  | ServerErrors.DatabaseError;

export class VoteOnComment implements UseCase<Votes.Commands.VoteOnCommentCommand, Result<CommentVote, VoteOnCommentError>> {
  constructor(
    private memberRepository: MembersRepository,
    private commentRepository: CommentRepository,
    private voteRepository: VoteRepository
  ) {}

  async execute(request: Votes.Commands.VoteOnCommentCommand): Promise<Result<CommentVote, VoteOnCommentError>> {
    let commentVote: CommentVote;
    const { memberId, commentId, voteType } = request.props;

    const [memberOrNull, commentOrNull, existingVoteOrNull] = await Promise.all([
      this.memberRepository.getMemberById(memberId),
      this.commentRepository.getCommentById(commentId),
      this.voteRepository.findVoteByMemberAndCommentId(memberId, commentId)
    ]);

    if (memberOrNull === null) {
      return Result.failure(new ApplicationErrors.NotFoundError('member'));
    }

    if (commentOrNull === null) {
      return Result.failure(new ApplicationErrors.NotFoundError('comment'));
    }

    if (!CanVoteOnCommentPolicy.isAllowed(memberOrNull)) {
      return Result.failure(new ApplicationErrors.PermissionError());
    }

    if (existingVoteOrNull) {
      commentVote = existingVoteOrNull;
    } else {
      let commentVoteOrError = CommentVote.create(memberId, commentId);

      if (commentVoteOrError instanceof ApplicationErrors.ValidationError) {
        return Result.failure(commentVoteOrError);
      }
      commentVote = commentVoteOrError;
    }

    commentVote.castVote(voteType);

    try {
      const domainEvents = commentVote.getDomainEvents();
      await this.voteRepository.saveAggregateAndEvents(commentVote, domainEvents);
      return Result.success(commentVote);
    } catch (error) {
      console.log(error);
      return Result.failure(new ServerErrors.DatabaseError());
    }
  }
}
