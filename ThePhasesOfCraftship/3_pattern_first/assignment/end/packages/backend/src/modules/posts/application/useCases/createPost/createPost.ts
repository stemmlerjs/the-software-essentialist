
import { MemberNotFoundError, PermissionError, ServerError, ValidationError } from "@dddforum/shared/src/errors";
import { CanCreatePostPolicy } from "./canCreatePost";
import { fail, success, UseCase, UseCaseResponse } from '@dddforum/shared/src/core/useCase';
import { Post } from "../../../domain/post";
import { PostsRepository } from "../../../repos/ports/postsRepository";
import { CreatePostCommand } from "../../../postsCommands";
import { MembersRepository } from "../../../../members/repos/ports/membersRepository";
import { VoteRepository } from "../../../../comments/repos/ports/voteRepository";
import { PostVote } from "../../../domain/postVote";

export type CreatePostResponse = UseCaseResponse<Post | undefined, ValidationError | PermissionError | MemberNotFoundError | ServerError>;

export class CreatePost implements UseCase<CreatePostCommand, CreatePostResponse> {

  constructor(
    private postRepository: PostsRepository, 
    private memberRepository: MembersRepository,
    private votesRepository: VoteRepository,
  ) {}

  async execute(request: CreatePostCommand): Promise<CreatePostResponse> {
    const { memberId, title, content, postType, link } = request.props;

    const member = await this.memberRepository.getMemberById(memberId);
    
    if (member === null) {
      return fail(new MemberNotFoundError())
    }

    if (!CanCreatePostPolicy.isAllowed(member)) {
      return fail(new PermissionError());
    }

    const postOrError = Post.create({
      title: title,
      content: content,
      memberId: memberId,
      postType,
      link
    });

    if (postOrError instanceof ValidationError) {
      return fail(postOrError);
    }

    const initialMemberVoteOrError = PostVote.create({
      voteType: 'upvote',
      postId: postOrError.id,
      memberId: memberId
    });

    if (initialMemberVoteOrError instanceof ValidationError) {
      return fail(initialMemberVoteOrError);
    }

    try {
      await this.postRepository.save(postOrError);
      await this.votesRepository.save(initialMemberVoteOrError);
      return success(postOrError);
      
    } catch (error) {
      console.log(error);
      return fail(new ServerError());
    }
  }
}
