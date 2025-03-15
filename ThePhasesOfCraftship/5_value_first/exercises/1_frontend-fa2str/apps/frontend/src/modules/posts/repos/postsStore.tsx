import { APIClient } from "@dddforum/api";
import { makeAutoObservable } from "mobx";
import { PostDm } from "../domain/postDm.js";
import { PostsRepository } from "./postsRepository.js";
import { Posts } from "@dddforum/api"
import { AuthStore } from "@/services/auth/auth/authStore.js";

export class PostsStore implements PostsRepository {
  public postsDm: PostDm[];

  constructor(
    private api: APIClient,
    private authStore: AuthStore
  ) {
    makeAutoObservable(this);
    this.postsDm = [];
  }

  async getPosts(query?: Posts.Queries.GetPostsQuery): Promise<PostDm[]> {
    const getPostsResponse = await this.api.posts.getPosts({ sort: query?.sort ?? 'popular' });
    const postDTOs = getPostsResponse.data;
    if (!postDTOs) {
      return [];
    }
    this.postsDm = postDTOs.map(postDTO => PostDm.fromDTO(postDTO));
    return this.postsDm;
  }

  async create(input: Posts.Inputs.CreatePostInput): Promise<PostDm> {
    const authToken = this.authStore.getToken() ?? '';
    const response = await this.api.posts.create(input, authToken);
    if (!response.data) {
      throw new Error('Failed to create post');
    }
    const newPost = PostDm.fromDTO(response.data);
    this.postsDm.push(newPost);
    return newPost;
  }
}
