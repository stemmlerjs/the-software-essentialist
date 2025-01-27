import { Post } from "@dddforum/shared/src/api/posts";

export interface PostsRepository {
  findPosts(sort: string): Promise<Post[]>;
}
