
import { MembersRepository } from "../../members/repos/ports/membersRepository";
import { CreatePostCommand } from "../postsCommands";
import { PostsRepository } from "../repos/ports/postsRepository";
import { CreatePost } from "./useCases/createPost/createPost";
import { Posts } from '@dddforum/api/src'

export class PostsService {
  constructor(private postsRepo: PostsRepository, private membersRepo: MembersRepository) {}

  async getPosts(query: Posts.Queries.GetPostsQuery) {
    return this.postsRepo.findPosts(query);
  }

  async createPost (command: CreatePostCommand) {
    return new CreatePost(this.postsRepo, this.membersRepo).execute(command);
  }

  async getPostById (id: string) {
    return this.postsRepo.getPostById(id);
  }

  async getPostDetailsById (id: string) {
    return this.postsRepo.getPostDetailsById(id);
  }
}
