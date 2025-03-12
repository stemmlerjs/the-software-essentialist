import * as Posts from '@dddforum/api/posts'
import { PostDm } from "../domain/postDm";

export interface PostsRepository {
  postsDm: PostDm[];
  getPosts(query?: Posts.Queries.GetPostsQuery): Promise<PostDm[]>;
  create(input: Posts.Inputs.CreatePostInput): Promise<PostDm>;
} 