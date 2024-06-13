import { PostsRepository } from "./ports/postsRepository";
import { GetPostsQuery } from "./postsQuery";

export class PostsService {
  constructor(private repository: PostsRepository) {}

  async getPosts(query: GetPostsQuery) {
    const sort = query.sort;
    const posts = await this.repository.findPosts(sort);
    return posts;
  }
}
