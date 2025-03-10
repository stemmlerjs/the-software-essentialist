import { Posts } from "@dddforum/shared/src/api";
import { PostDm } from "../domain/postDm";

export interface PostsRepository {
  postsDm: PostDm[];
  getPosts(query?: Posts.GetPostsQueryOption): Promise<PostDm[]>;
}
