
import { PostReadModel } from "../domain/postReadModel";

export interface PostsRepository {
  findPosts(sort: string): Promise<PostReadModel[]>;
}
