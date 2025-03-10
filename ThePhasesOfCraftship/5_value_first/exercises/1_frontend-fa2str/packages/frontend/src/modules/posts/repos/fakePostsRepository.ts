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

  async getPosts(query?: Posts.Queries.GetPostsQuery): Promise<PostDm[]> {
    if (query?.sort === "recent") {
      return this.postsDm.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
    } else if (query?.sort === "popular") {
      return this.postsDm.sort((a, b) => b.voteScore - a.voteScore);
    }
    return this.postsDm;
  }

  async create(command: Posts.Commands.CreatePostsCommand): Promise<PostDm> {
    const props = command.getProps();
    const newPost = new PostDm({
      title: props.title,
      content: props.content || '',
      memberId: "fake-member", 
      memberUsername: "fake-user"
    });
    this.postsDm.push(newPost);
    return newPost;
  }
}
