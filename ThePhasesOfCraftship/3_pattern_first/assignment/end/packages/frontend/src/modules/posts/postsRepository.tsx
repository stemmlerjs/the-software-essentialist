import { APIClient } from "@dddforum/shared/src/api";
import { PostDm } from "./postDm";

export class PostsRepository {
  public posts: PostDm[];

  constructor (private api: APIClient) {
    this.posts = [];
  }

  async getPosts(query?: any) {
    const getPostsResponse = await this.api.posts.getPosts('popular');
    const postDTOs = getPostsResponse.data;
    this.posts = postDTOs.map(postDTO => PostDm.fromDTO(postDTO));
  }
}
