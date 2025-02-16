
import { CommentNotFoundError, MemberNotFoundError, PermissionError, ServerError, ValidationError } from "@dddforum/shared/src/errors";
import { MembersRepository } from "../../../members/repos/ports/membersRepository";
import { CanVoteOnCommentPolicy } from "./canVoteOnComment";
import { UseCase } from '@dddforum/shared/src/core/useCase';
import { CommentRepository } from "../../repos/ports/commentRepository";
import { VoteRepository } from "../../../votes/repos/ports/voteRepository";
import { CommentVote } from "../../../votes/domain/commentVote";
import { VoteOnCommentCommand } from "../../../posts/postsCommands";

type VoteOnCommentResponse = CommentVote | ValidationError | PermissionError | MemberNotFoundError | CommentNotFoundError | ServerError;

export class VoteOnComment implements UseCase<VoteOnCommentCommand, VoteOnCommentResponse> {

  constructor(
    private memberRepository: MembersRepository,
    private commentRepository: CommentRepository,
    private voteRepository: VoteRepository
  ) {}

  async execute(request: VoteOnCommentCommand): Promise<VoteOnCommentResponse> {
    let commentVote: CommentVote;
    const { memberId, commentId, voteType } = request.props;

    const [memberOrNull, commentOrNull, existingVoteOrNull] = await Promise.all([
      this.memberRepository.getMemberById(memberId),
      this.commentRepository.getCommentById(commentId),
      this.voteRepository.findVoteByMemberIdAndCommentId(memberId, commentId)
    ]);

    if (memberOrNull === null) {
      return new MemberNotFoundError();
    }

    if (commentOrNull === null) {
      return new CommentNotFoundError();
    }

    if (!CanVoteOnCommentPolicy.isAllowed(memberOrNull)) {
      return new PermissionError();
    }

    if (existingVoteOrNull) {
      commentVote = existingVoteOrNull
      
    } else {
      let commentVoteOrError = CommentVote.create({
        memberId, commentId, voteType
      });

      if (commentVoteOrError instanceof ValidationError) {
        return commentVoteOrError;
      }
      commentVote = commentVoteOrError;
    }

    commentVote.castVote(voteType)

    try {
      await this.voteRepository.save(commentVote);

      return commentVote;
      
    } catch (error) {
      console.log(error);
      return new ServerError();
    }
  }
}
