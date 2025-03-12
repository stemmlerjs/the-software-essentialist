
import { MembersRepository } from "../../members/repos/ports/membersRepository";
import { PostsRepository } from "../repos/ports/postsRepository";
import { CreatePost } from "./useCases/createPost/createPost";
import { Commands, Queries } from '@dddforum/api/posts'

export class PostsService {
  constructor(private postsRepo: PostsRepository, private membersRepo: MembersRepository) {}

  async getPosts(query: Queries.GetPostsQuery) {
    return this.postsRepo.findPosts(query);
  }

  async createPost (command: Commands.CreatePostCommand) {
    return new CreatePost(this.postsRepo, this.membersRepo).execute(command);
  }

  async getPostById (id: string) {
    return this.postsRepo.getPostById(id);
  }

  async getPostDetailsById (id: string) {
    return this.postsRepo.getPostDetailsById(id);
  }
}
