import { Posts } from "@dddforum/shared/src/api";
import { PostDm } from "../domain/postDm";

export interface PostsRepository {
  postsDm: PostDm[];
  getPosts(query?: Posts.GetPostsQueryOption): Promise<PostDm[]>;
  create (command: Posts.Commands.CreatePostsCommand): Promise<PostDm>; // TODO: strictly type response
}
