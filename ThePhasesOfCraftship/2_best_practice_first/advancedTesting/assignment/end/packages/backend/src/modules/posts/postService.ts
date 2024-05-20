import { GetPostsQuery } from "@dddforum/shared/src/api/posts";
import { Errors } from "../../shared/errors/errors";
import { Database } from "../../shared/database/database";

export class PostService {
  constructor (private db: Database) {

  }

  async getPosts (query: GetPostsQuery) {
    try {

      if (query.sort !== 'recent') {
        return { error: Errors.ClientError, data: undefined, success: false };
      } 

      let posts = await this.db.posts.getPosts();
  
      return { error: undefined, data: { posts }, success: true };
    } catch (error) {
      return { error: Errors.ServerError, data: undefined, success: false }
    }
  }
}