
import { DatabaseError } from "../../../../shared/exceptions";
import { Post } from "../../domain/writeModels/post";

export interface PostsRepository {
  findPosts(sort: "popular" | "recent"): Promise<Post[]>;
  save (post: Post): Promise<void | DatabaseError>;
  getPostById (id: string): Promise<Post | null>;
}
