
import { DatabaseError } from "../../../../shared/exceptions";
import { PostReadModel } from "../../domain/readModels/postReadModel";
import { Post } from "../../domain/writeModels/post";
import { GetPostsQuery } from "../../postsQuery";

export interface PostsRepository {
  findPosts(query: GetPostsQuery): Promise<PostReadModel[]>;
  save (post: Post): Promise<void | DatabaseError>;
  getPostById (id: string): Promise<Post | null>;
}
