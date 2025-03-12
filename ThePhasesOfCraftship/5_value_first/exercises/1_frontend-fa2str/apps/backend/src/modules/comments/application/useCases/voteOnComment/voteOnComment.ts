
import { ApplicationErrors } from "@dddforum/errors/application";
import { ServerErrors } from "@dddforum/errors/server";
import { CommentVote } from "../../../domain/commentVote";
import { UseCase } from "@dddforum/core";
import { MembersRepository } from "../../../../members/repos/ports/membersRepository";
import { CommentRepository } from "../../../repos/ports/commentRepository";
import { VoteRepository } from "../../../../votes/repos/ports/voteRepository";
import { CanVoteOnCommentPolicy } from "../../../../votes/application/useCases/voteOnComment/canVoteOnComment";
import { Commands }from "@dddforum/api/votes"

type VoteOnCommentResponse = CommentVote 
  | ApplicationErrors.ValidationError 
  | ApplicationErrors.PermissionError 
  | ApplicationErrors.NotFoundError 
  | ServerErrors.ServerErrorException;

export class VoteOnComment implements UseCase<Commands.VoteOnCommentCommand, VoteOnCommentResponse> {

  constructor(
    private memberRepository: MembersRepository,
    private commentRepository: CommentRepository,
    private voteRepository: VoteRepository
  ) {}

  async execute(request: Commands.VoteOnCommentCommand): Promise<VoteOnCommentResponse> {
    let commentVote: CommentVote
    const { memberId, commentId, voteType } = request.props;

    const [memberOrNull, commentOrNull, existingVoteOrNull] = await Promise.all([
      this.memberRepository.getMemberById(memberId),
      this.commentRepository.getCommentById(commentId),
      this.voteRepository.findVoteByMemberAndCommentId(memberId, commentId)
    ]);

    if (memberOrNull === null) {
      return new ApplicationErrors.NotFoundError('member');
    }

    if (commentOrNull === null) {
      return new ApplicationErrors.NotFoundError('comment');
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
      commentVote = commentVoteOrError as CommentVote;
    }

    commentVote.castVote(voteType)

    try {
      await this.voteRepository.saveAggregateAndEvents(commentVote, commentVote.getDomainEvents());

      return commentVote;
      
    } catch (error) {
      console.log(error);
      return new ServerErrors.ServerErrorException();
    }
  }
}
