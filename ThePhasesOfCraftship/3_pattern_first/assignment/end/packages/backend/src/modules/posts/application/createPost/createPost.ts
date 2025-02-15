
// TODO: Organize this and fix it somehow
import { CreatePostInput, CreatePostResponse } from "@dddforum/shared/src/api/posts";

import { PostsRepository } from "../../repos/ports/postsRepository";
import { Post } from "../../domain/writeModels/post";
import { MemberNotFoundError, PermissionError, ServerError, ValidationError } from "@dddforum/shared/src/errors";
import { CreatePostCommand } from "../../postsCommands";
import { MembersRepository } from "../../../members/repos/ports/membersRepository";
import { CanCreatePostPolicy } from "./canCreatePost";

interface UseCase<Request, Response> { 
  execute(request: Request): Promise<Response>;
}

type Response = Post | ValidationError | PermissionError | MemberNotFoundError | ServerError;

export class CreatePost implements UseCase<CreatePostCommand, Response> {

  constructor(private postRepository: PostsRepository, private memberRepository: MembersRepository) {}

  async execute(request: CreatePostCommand): Promise<Response> {
    const { memberId, title, content, postType, link } = request.props;

    const member = await this.memberRepository.getMemberById(memberId);
    
    if (member === null) {
      return new MemberNotFoundError();
    }

    if (!CanCreatePostPolicy.isAllowed(member)) {
      return new PermissionError();
    }

    const postOrError = Post.create({
      title: title,
      content: content,
      memberId: memberId,
      postType,
      link
    });

    if (postOrError instanceof ValidationError) {
      return postOrError
    }

    try {
      await this.postRepository.save(postOrError);
      return postOrError;
      
    } catch (error) {
      console.log(error);
      return new ServerError();
    }
  }
}
