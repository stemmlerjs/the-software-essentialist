import { Posts } from "@dddforum/shared/src/api";
import { PostsRepository } from "./postsRepository";
import { PostDm } from "../domain/postDm";
import { PostDTO } from "@dddforum/shared/src/api/posts";
import { makeAutoObservable } from "mobx";

export class FakePostsRepository implements PostsRepository {
  postsDm: PostDm[] = [];

  constructor(fakePostsData: PostDTO[]) {
    makeAutoObservable(this);
    this.postsDm = fakePostsData.map(postDTO => PostDm.fromDTO(postDTO));
  }

  async getPosts(query?: Posts.GetPostsQueryOption): Promise<PostDm[]> {
    if (query === "recent") {
      return this.postsDm.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
    } else if (query === "popular") {
      return this.postsDm.sort((a, b) => b.voteScore - a.voteScore);
    }
    return this.postsDm;
  }

  async create(command: Posts.CreatePostInput): Promise<PostDm> {
    const newPost = new PostDm({
      title: command.title,
      content: command.content || '',
      memberId: "fake-member",
      memberUsername: "fake-user"
    });
    this.postsDm.push(newPost);
    return newPost;
  }
}
