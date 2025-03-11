
import { ApplicationErrors, ServerErrors } from"@dddforum/errors/src";
import { fail, success, UseCase, UseCaseResponse } from "@dddforum/core/src";
import { MembersRepository } from "../../../../members/repos/ports/membersRepository";

import { CanVoteOnPostPolicy } from "./canVoteOnPost";
import { VoteOnPostCommand } from "../../../votesCommands";
import { PostVote } from "../../../../posts/domain/postVote";
import { PostsRepository } from "../../../../posts/repos/ports/postsRepository";
import { VoteRepository } from "../../../repos/ports/voteRepository";

type VoteOnPostResponse = UseCaseResponse<PostVote | undefined, 
  ApplicationErrors.ValidationError | 
  ApplicationErrors.PermissionError | 
  ApplicationErrors.NotFoundError | 
  ServerErrors.AnyServerError>;

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
      return fail(new ApplicationErrors.NotFoundError('member'));
    }

    if (postOrNull === null) {
      return fail(new ApplicationErrors.NotFoundError('post'));
    }

    if (!CanVoteOnPostPolicy.isAllowed(memberOrNull)) {
      return fail(new ApplicationErrors.PermissionError()); 
      // TODO: these need to specify their policy
      // TODO: these need tests
    }

    if (existingVoteOrNull) {
      postVote = existingVoteOrNull
      
    } else {
      let postVoteOrError = PostVote.create(memberId, postId);

      if (postVoteOrError instanceof ApplicationErrors.ValidationError) {
        // TODO: should be using 'fail' all throughout
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
      // TODO: should encapsulate the database error
      return fail(new ServerErrors.DatabaseError());
    }
  }
}
