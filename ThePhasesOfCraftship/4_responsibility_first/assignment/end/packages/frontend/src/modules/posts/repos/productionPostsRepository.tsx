import { APIClient, Posts } from "@dddforum/shared/src/api";
import { makeAutoObservable } from "mobx";
import { PostDm } from "../domain/postDm";

export class ProductionPostsRepository {
  public postsDm: PostDm[];

  constructor (private api: APIClient) {
    makeAutoObservable(this);
    this.postsDm = [];
  }

  async getPosts(query?: Posts.GetPostsQueryOption) {
    const getPostsResponse = await this.api.posts.getPosts(query ? query : 'popular');
    const postDTOs = getPostsResponse.data;
    this.postsDm = postDTOs.map(postDTO => PostDm.fromDTO(postDTO));
    return this.postsDm
  }
}
