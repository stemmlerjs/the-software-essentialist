
import { MemberNotFoundError, PermissionError, ServerError, ValidationError } from "@dddforum/shared/src/errors";
import { CanCreatePostPolicy } from "./canCreatePost";
import { fail, success, UseCase, UseCaseResponse } from '@dddforum/shared/src/core/useCase';
import { Post } from "../../../domain/post";
import { PostsRepository } from "../../../repos/ports/postsRepository";
import { CreatePostCommand } from "../../../postsCommands";
import { MembersRepository } from "../../../../members/repos/ports/membersRepository";
import { PostVote } from "../../../domain/postVote";
import { EventBus } from "@dddforum/shared/src/events/bus/ports/eventBus";

export type CreatePostResponse = UseCaseResponse<Post | undefined, ValidationError | PermissionError | MemberNotFoundError | ServerError>;

export class CreatePost implements UseCase<CreatePostCommand, CreatePostResponse> {

  constructor(
    private postRepository: PostsRepository, 
    private memberRepository: MembersRepository,
    private eventBus: EventBus
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

    const initialMemberVoteOrError = PostVote.create(memberId, postOrError.id);

    if (initialMemberVoteOrError instanceof ValidationError) {
      return fail(initialMemberVoteOrError);
    }

    initialMemberVoteOrError.castVote('upvote');

    try {
      await this.postRepository.save(postOrError);
      await this.eventBus.publishEvents(postOrError.getDomainEvents());

      return success(postOrError);
      
    } catch (error) {
      console.log(error);
      return fail(new ServerError());
    }
  }
}
