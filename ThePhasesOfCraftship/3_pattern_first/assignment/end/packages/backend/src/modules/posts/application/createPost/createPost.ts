
// TODO: Organize this and fix it somehow
import { CreatePostInput, CreatePostResponse } from "@dddforum/shared/src/api/posts";

import { PostsRepository } from "../../repos/ports/postsRepository";
import { Post } from "../../domain/writeModels/post";
import { MemberNotFoundError, PermissionError, ServerError, ValidationError } from "@dddforum/shared/src/errors";
import { CreatePostCommand } from "../../postsCommands";
import { MembersRepository } from "../../../members/repos/ports/membersRepository";

interface UseCase<Request, Response> { 
  execute(request: Request): Promise<Response>;
}

type Response = Post | ValidationError | PermissionError | MemberNotFoundError | ServerError;

export class CreatePost implements UseCase<CreatePostCommand, Response> {

  constructor(private postRepository: PostsRepository, memberRepository: MembersRepository) {}

  execute(request: CreatePostCommand): Promise<Response> {
    throw new Error("Method not implemented.");
  }

}
