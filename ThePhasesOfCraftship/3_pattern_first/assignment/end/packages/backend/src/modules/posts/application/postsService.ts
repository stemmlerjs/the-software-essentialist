
import { VoteRepository } from "../../comments/repos/ports/commentVoteRepository";
import { MembersRepository } from "../../members/repos/ports/membersRepository";
import { CreatePostCommand } from "../postsCommands";
import { GetPostsQuery } from "../postsQuery";
import { PostsRepository } from "../repos/ports/postsRepository";
import { CreatePost } from "./useCases/createPost/createPost";

export class PostsService {
  constructor(private postsRepo: PostsRepository, private membersRepo: MembersRepository, private votesRepository: VoteRepository) {}

  async getPosts(query: GetPostsQuery) {
    // Todo: Make the underlying repo use real models instead. Use "postdetails" in the contract. Start w/ the contract.
    // Todo: Pass the entire query object to the repo, not just the sort.
    // Todo: Clean up the contract so that the repo returns strictly typed responses instead of "null";
    // Todo: Clean up the contract like this on all repositories.
    return this.postsRepo.findPosts(query);
  }

  async createPost (command: CreatePostCommand) {
    // Todo: design all slices like this for commands, it's pretty clean and the composition is nice.
    return new CreatePost(this.postsRepo, this.membersRepo, this.votesRepository).execute(command);
  }

  async getPostById (id: string) {
     // Todo: Make the contract have both 'getPostById' and 'getPostDetailsById' methods.
    return this.postsRepo.getPostById(id);
  }

  async getPostDetailsById (id: string) {
    return this.postsRepo.getPostDetailsById(id);
  }
}
