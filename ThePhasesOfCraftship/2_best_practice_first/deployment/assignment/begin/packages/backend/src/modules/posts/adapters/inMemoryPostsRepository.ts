import { Post } from "@dddforum/shared/src/api/posts";
import { PostsRepository } from "../ports/postsRepository";

export class InMemoryPostsRepository implements PostsRepository {
  findPosts(_sort: string): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
}
