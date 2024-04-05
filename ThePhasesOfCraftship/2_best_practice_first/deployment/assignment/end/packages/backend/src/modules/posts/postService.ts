import { GetPostsQuery } from "@dddforum/shared/src/api/posts";
import { Errors } from "../../shared/errors/errors";
import { DBConnection } from "../../shared/database/database";

export class PostService {
  constructor (private db: DBConnection) {

  }

  async getPosts (query: GetPostsQuery) {
    const dbConnection = this.db.getConnection();
    try {

      if (query.sort !== 'recent') {
        return { error: Errors.ClientError, data: undefined, success: false };
      } 
  
      let postsWithVotes = await dbConnection.post.findMany({
        include: {
          votes: true, // Include associated votes for each post
          memberPostedBy: {
            include: {
              user: true
            }
          },
          comments: true
        },
        orderBy: {
          dateCreated: 'desc', // Sorts by dateCreated in descending order
        },
      });
  
      return { error: undefined, data: { posts: postsWithVotes }, success: true };
    } catch (error) {
      return { error: Errors.ServerError, data: undefined, success: false }
    }
  }
}