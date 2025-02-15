

import { PostsRepository } from "../ports/postsRepository";
import { DatabaseError } from "../../../../shared/exceptions";
import { Post } from "../../domain/writeModels/post";
import { GetPostsQuery } from "../../postsQuery";
import { PostReadModel } from "../../domain/readModels/postReadModel";

export class InMemoryPostsRepository implements PostsRepository {
  private posts: PostReadModel[];

  constructor (posts?: PostReadModel[]) {
    this.posts = posts ? posts : []
  }
  getPostById(id: string): Promise<Post | null> {
    throw new Error("Method not implemented.");
  }

  async findPosts(query: GetPostsQuery): Promise<PostReadModel[]> {
    return this.posts;
  }

  public static createWithSeedData (): InMemoryPostsRepository {
    // Put seed data here
    return new InMemoryPostsRepository();
  }

  public async save(post: Post): Promise<void | DatabaseError> {

    return Promise.resolve();
    
  }
}
