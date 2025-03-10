import { APIClient, Posts } from "@dddforum/shared/src/api";
import { makeAutoObservable } from "mobx";
import { PostDm } from "../domain/postDm";
import { AuthRepository } from "../../users/repos/authRepository";

export interface PostsRepository {
  postsDm: PostDm[];
  getPosts(query?: Posts.GetPostsQueryOption): Promise<PostDm[]>;
  create(command: Posts.CreatePostInput): Promise<PostDm>;
}

export class ProductionPostsRepository implements PostsRepository {
  public postsDm: PostDm[];

  constructor(
    private api: APIClient,
    private authRepository: AuthRepository
  ) {
    makeAutoObservable(this);
    this.postsDm = [];
  }

  async getPosts(query?: Posts.GetPostsQueryOption): Promise<PostDm[]> {
    const getPostsResponse = await this.api.posts.getPosts(query ?? 'popular');
    const postDTOs = getPostsResponse.data;
    if (!postDTOs) {
      return [];
    }
    this.postsDm = postDTOs.map(postDTO => PostDm.fromDTO(postDTO));
    return this.postsDm;
  }

  async create(command: Posts.CreatePostInput): Promise<PostDm> {
    const authToken = this.authRepository.getToken() ?? '';
    const response = await this.api.posts.create({
      ...command,
      postType: command.link ? 'link' : 'text'
    }, authToken);
    if (!response.data) {
      throw new Error('Failed to create post');
    }
    const newPost = PostDm.fromDTO(response.data);
    this.postsDm.push(newPost);
    return newPost;
  }
}
