import { Posts } from "@dddforum/api";
import { PostDm } from "../domain/postDm";

export interface PostsRepository {
  postsDm: PostDm[];
  getPosts(query?: Posts.Queries.GetPostsQuery): Promise<PostDm[]>;
  create(command: Posts.Commands.CreatePostCommand): Promise<PostDm>;
} 