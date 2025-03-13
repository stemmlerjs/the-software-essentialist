
import { ServerErrors } from "@dddforum/errors/server";
import { ApplicationErrors } from "@dddforum/errors/application";
import { CanCreatePostPolicy } from "./canCreatePost";
import { fail, success, UseCase, UseCaseResponse } from '@dddforum/core';
import { Post } from "../../../domain/post";
import { PostsRepository } from "../../../repos/ports/postsRepository";
import { MembersRepository } from "../../../../members/repos/ports/membersRepository";
import { PostVote } from "../../../domain/postVote";
import { Commands } from '@dddforum/api/posts'

export type CreatePostResponse = UseCaseResponse<Post | undefined, 
  ApplicationErrors.ValidationError | 
  ApplicationErrors.PermissionError | 
  ApplicationErrors.NotFoundError | 
  ServerErrors.ServerErrorException>;

export class CreatePost implements UseCase<Commands.CreatePostCommand, CreatePostResponse> {

  constructor(
    private postRepository: PostsRepository, 
    private memberRepository: MembersRepository
  ) {}

  async execute(request: Commands.CreatePostCommand): Promise<CreatePostResponse> {
    const props = request.getProps();
    const { memberId, title, content, postType, link } = props;

    const member = await this.memberRepository.getMemberById(memberId);
    
    if (member === null) {
      return fail(new ApplicationErrors.NotFoundError('member'))
    }

    if (!CanCreatePostPolicy.isAllowed(member)) {
      return fail(new ApplicationErrors.PermissionError());
    }

    const postOrError = Post.create({
      title: title,
      content: content,
      memberId: memberId,
      postType,
      link
    });

    if (postOrError instanceof ApplicationErrors.ValidationError) {
      return fail(postOrError);
    }

    const initialMemberVoteOrError = PostVote.create(memberId, postOrError.id);

    if (initialMemberVoteOrError instanceof ApplicationErrors.ValidationError) {
      return fail(initialMemberVoteOrError);
    }

    initialMemberVoteOrError.castVote('upvote');

    try {
      await this.postRepository.saveAggregateAndEvents(postOrError, postOrError.getDomainEvents());

      return success(postOrError);
      
    } catch (error) {
      console.log(error);
      return fail(new ServerErrors.ServerErrorException());
    }
  }
}
