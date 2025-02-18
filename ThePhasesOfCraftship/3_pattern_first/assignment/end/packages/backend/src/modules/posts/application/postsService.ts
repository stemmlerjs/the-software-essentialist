
import { VoteRepository } from "../../votes/repos/ports/voteRepository";
import { MembersRepository } from "../../members/repos/ports/membersRepository";
import { CreatePostCommand } from "../postsCommands";
import { GetPostsQuery } from "../postsQuery";
import { PostsRepository } from "../repos/ports/postsRepository";
import { CreatePost } from "./useCases/createPost/createPost";

export class PostsService {
  constructor(private postsRepo: PostsRepository, private membersRepo: MembersRepository, private votesRepository: VoteRepository) {}

  async getPosts(query: GetPostsQuery) {
    return this.postsRepo.findPosts(query);
  }

  async createPost (command: CreatePostCommand) {
    return new CreatePost(this.postsRepo, this.membersRepo, this.votesRepository).execute(command);
  }

  async getPostById (id: string) {
    return this.postsRepo.getPostById(id);
  }

  async getPostDetailsById (id: string) {
    return this.postsRepo.getPostDetailsById(id);
  }
}
