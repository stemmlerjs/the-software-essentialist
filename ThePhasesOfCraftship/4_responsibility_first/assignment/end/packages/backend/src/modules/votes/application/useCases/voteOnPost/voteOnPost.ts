
import { CommentNotFoundError, MemberNotFoundError, PermissionError, PostNotFoundError, ServerError, ValidationError } from "@dddforum/shared/src/errors";
import { fail, success, UseCase, UseCaseResponse } from "@dddforum/shared/src/core/useCase";
import { MembersRepository } from "../../../../members/repos/ports/membersRepository";

import { CanVoteOnPostPolicy } from "./canVoteOnPost";
import { VoteOnPostCommand } from "../../../votesCommands";
import { PostVote } from "../../../../posts/domain/postVote";
import { PostsRepository } from "../../../../posts/repos/ports/postsRepository";
import { VoteRepository } from "../../../repos/ports/voteRepository";

type VoteOnPostResponse = UseCaseResponse<PostVote | undefined, ValidationError | PermissionError | MemberNotFoundError | CommentNotFoundError | ServerError>

export class VoteOnPost implements UseCase<VoteOnPostCommand, VoteOnPostResponse> {

  constructor(
    private memberRepository: MembersRepository,
    private postRepository: PostsRepository,
    private voteRepository: VoteRepository
  ) {}

  async execute(request: VoteOnPostCommand): Promise<VoteOnPostResponse> {
    let postVote: PostVote;
    const { memberId, postId, voteType } = request.props;

    const [memberOrNull, postOrNull, existingVoteOrNull] = await Promise.all([
      this.memberRepository.getMemberById(memberId),
      this.postRepository.getPostDetailsById(postId),
      this.voteRepository.findVoteByMemberAndPostId(memberId, postId)
    ]);

    if (memberOrNull === null) {
      return fail(new MemberNotFoundError());
    }

    if (postOrNull === null) {
      return fail(new PostNotFoundError());
    }

    if (!CanVoteOnPostPolicy.isAllowed(memberOrNull)) {
      return fail(new PermissionError());
    }

    if (existingVoteOrNull) {
      postVote = existingVoteOrNull
      
    } else {
      let postVoteOrError = PostVote.create(memberId, postId);

      if (postVoteOrError instanceof ValidationError) {
        return fail(postVoteOrError);
      }
      postVote = postVoteOrError;
    }

    postVote.castVote(voteType)

    try {
      const domainEvents = postVote.getDomainEvents();
      
      await this.voteRepository.saveAggregateAndEvents(postVote, domainEvents);

      return success(postVote);
      
    } catch (error) {
      console.log(error);
      return fail(new ServerError());
    }
  }
}
