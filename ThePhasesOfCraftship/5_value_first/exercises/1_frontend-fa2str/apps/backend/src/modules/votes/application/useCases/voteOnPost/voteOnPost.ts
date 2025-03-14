import { ApplicationErrors } from "@dddforum/errors/application";
import { ServerErrors } from "@dddforum/errors/server";
import { Result, UseCase } from "@dddforum/core";
import { MembersRepository } from "../../../../members/repos/ports/membersRepository";

import { CanVoteOnPostPolicy } from "./canVoteOnPost";
import { PostVote } from "../../../../posts/domain/postVote";
import { PostsRepository } from "../../../../posts/repos/ports/postsRepository";
import { VoteRepository } from "../../../repos/ports/voteRepository";
import { Commands } from "@dddforum/api/votes";

type VoteOnPostError = 
  | ApplicationErrors.ValidationError 
  | ApplicationErrors.PermissionError 
  | ApplicationErrors.NotFoundError 
  | ServerErrors.DatabaseError;

export class VoteOnPost implements UseCase<Commands.VoteOnPostCommand, Result<PostVote, VoteOnPostError>> {

  constructor(
    private memberRepository: MembersRepository,
    private postRepository: PostsRepository,
    private voteRepository: VoteRepository
  ) {}

  async execute(request: Commands.VoteOnPostCommand): Promise<Result<PostVote, VoteOnPostError>> {
    let postVote: PostVote;
    const { memberId, postId, voteType } = request.props;

    const [memberOrNull, postOrNull, existingVoteOrNull] = await Promise.all([
      this.memberRepository.getMemberById(memberId),
      this.postRepository.getPostDetailsById(postId),
      this.voteRepository.findVoteByMemberAndPostId(memberId, postId)
    ]);

    if (memberOrNull === null) {
      return Result.failure(new ApplicationErrors.NotFoundError('member'));
    }

    if (postOrNull === null) {
      return Result.failure(new ApplicationErrors.NotFoundError('post'));
    }

    if (!CanVoteOnPostPolicy.isAllowed(memberOrNull)) {
      return Result.failure(new ApplicationErrors.PermissionError()); 
      // TODO: these need to specify their policy
      // TODO: these need tests
    }

    if (existingVoteOrNull) {
      postVote = existingVoteOrNull
      
    } else {
      let postVoteOrError = PostVote.create(memberId, postId);

      if (postVoteOrError instanceof ApplicationErrors.ValidationError) {
        // TODO: should be using 'fail' all throughout
        return Result.failure(postVoteOrError);
      }
      postVote = postVoteOrError;
    }

    postVote.castVote(voteType)

    try {
      const domainEvents = postVote.getDomainEvents();
      
      await this.voteRepository.saveAggregateAndEvents(postVote, domainEvents);

      return Result.success(postVote);
      
    } catch (error) {
      console.log(error);
      // TODO: should encapsulate the database error
      return Result.failure(new ServerErrors.DatabaseError());
    }
  }
}
