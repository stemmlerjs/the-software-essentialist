

import { PostsRepository } from "../ports/postsRepository";
import { DatabaseError } from "../../../../shared/exceptions";
import { Post } from "../../domain/post";
import { GetPostsQuery } from "../../postsQuery";
import { PostReadModel } from "../../domain/postReadModel";
import { DomainEvent } from "@dddforum/shared/src/core/domainEvent";

export class InMemoryPostsRepository implements PostsRepository {
  private posts: PostReadModel[];

  constructor (posts?: PostReadModel[]) {
    this.posts = posts ? posts : []
  }
  saveAggregateAndEvents(post: Post, events: DomainEvent[]): Promise<void> {
    throw new Error("Method not implemented.");
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

  public async getPostDetailsById(id: string): Promise<PostReadModel | null> {
    return this.posts.find(post => post.id === id) || null;
  }
}
