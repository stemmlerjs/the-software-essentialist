
import { DatabaseError } from "../../../../shared/exceptions";
import { Post } from "../../domain/writeModels/post";
import { GetPostsQuery } from "../../postsQuery";

export interface PostsRepository {
  findPosts(query: GetPostsQuery): Promise<Post[]>;
  save (post: Post): Promise<void | DatabaseError>;
  getPostById (id: string): Promise<Post | null>;
}
