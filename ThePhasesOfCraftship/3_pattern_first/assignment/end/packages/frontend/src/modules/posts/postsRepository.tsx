import { APIClient, Posts } from "@dddforum/shared/src/api";
import { PostDm } from "./postDm";
import { makeAutoObservable } from "mobx";

export class PostsRepository {
  public postsDm: PostDm[];

  constructor (private api: APIClient) {
    makeAutoObservable(this);
    this.postsDm = [];
  }

  async getPosts(query?: Posts.GetPostsQueryOption) {
    const getPostsResponse = await this.api.posts.getPosts(query ? query : 'popular');
    const postDTOs = getPostsResponse.data;
    console.log(postDTOs);
    this.postsDm = postDTOs.map(postDTO => PostDm.fromDTO(postDTO));
  }
}
