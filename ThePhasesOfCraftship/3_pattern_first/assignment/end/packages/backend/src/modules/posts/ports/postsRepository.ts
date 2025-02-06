
import { DatabaseError } from "../../../shared/exceptions";
import { Post } from "../domain/post";
import { PostReadModel } from "../domain/postReadModel";

export interface PostsRepository {
  findPosts(sort: "popular" | "recent"): Promise<PostReadModel[]>;
  save (post: Post): Promise<void | DatabaseError>;
}
