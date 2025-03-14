import { Posts } from "@dddforum/api";
import { PostsRepository } from "./postsRepository";
import { PostDm } from "../domain/postDm";
import { makeAutoObservable } from "mobx";



export class FakePostsRepository implements PostsRepository {
  postsDm: PostDm[] = [];

  constructor(fakePostsData: Posts.DTOs.PostDTO[]) {
    makeAutoObservable(this);
    this.postsDm = fakePostsData.map(postDTO => PostDm.fromDTO(postDTO));
  }

  async getPosts(query?: Posts.Queries.GetPostsQuery): Promise<PostDm[]> {
    if (query?.sort === "recent") {
      return this.postsDm.sort((a, b) => {
        const dateA = a.props.dateCreated || new Date().toISOString();
        const dateB = b.props.dateCreated || new Date().toISOString();
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
    } else if (query?.sort === "popular") {
      return this.postsDm.sort((a, b) => (b.props.voteScore || 0) - (a.props.voteScore || 0));
    }
    return this.postsDm;
  }

  async create(input: Posts.Inputs.CreatePostInput): Promise<PostDm> {
    const newPost = new PostDm({
      title: input.title,
      content: input.content || '',
      memberId: "fake-member",
      memberUsername: "fake-user",
      numComments: 0,
      dateCreated: new Date().toISOString(),
      voteScore: 0
    });
    this.postsDm.push(newPost);
    return newPost;
  }
}
