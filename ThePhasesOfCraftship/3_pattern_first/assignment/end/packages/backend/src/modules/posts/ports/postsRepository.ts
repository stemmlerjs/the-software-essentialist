
import { PostReadModel } from "../domain/postReadModel";

export interface PostsRepository {
  findPosts(sort: "popular" | "recent"): Promise<PostReadModel[]>;
}
