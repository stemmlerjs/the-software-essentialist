import { Database } from "../../shared/database";
import { GetPostsQuery } from "./postsQuery";

export class PostsService {
  constructor(private db: Database) {}

  async getPosts(query: GetPostsQuery) {
    const sort = query.sort;
    const posts = await this.db.posts.findPosts(sort);
    return posts;
  }
}
