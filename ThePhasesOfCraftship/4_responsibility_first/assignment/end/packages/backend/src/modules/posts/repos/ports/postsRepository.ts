
import { DatabaseError } from "../../../../shared/exceptions";
import { PostReadModel } from "../../domain/postReadModel";
import { Post } from "../../domain/post";
import { GetPostsQuery } from "../../postsQuery";

export interface PostsRepository {
  findPosts(query: GetPostsQuery): Promise<PostReadModel[]>;
  save (post: Post): Promise<void | DatabaseError>;
  getPostById (id: string): Promise<Post | null>;
  getPostDetailsById (id: string): Promise<PostReadModel | null>;
}
