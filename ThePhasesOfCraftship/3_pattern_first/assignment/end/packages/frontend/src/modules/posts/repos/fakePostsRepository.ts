
import { Posts } from "@dddforum/shared/src/api";
import { PostsRepository } from "./postsRepository";
import { PostDm } from "../domain/postDm";
import { PostDTO } from "@dddforum/shared/src/api/posts";
import { makeAutoObservable } from "mobx";


export class FakePostsRepository implements PostsRepository {
  postsDm: PostDm[] = [];

  constructor (fakePostsData: PostDTO[]) {
    makeAutoObservable(this);
    this.postsDm = fakePostsData.map(postDTO => PostDm.fromDTO(postDTO));
  }

  async getPosts(query?: Posts.GetPostsQueryOption): Promise<PostDm[]> {
    return this.postsDm
  }
}
