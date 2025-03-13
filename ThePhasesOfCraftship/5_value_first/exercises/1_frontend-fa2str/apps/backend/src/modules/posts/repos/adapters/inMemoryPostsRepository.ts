

import { PostsRepository } from "../ports/postsRepository";
import { ServerErrors } from "@dddforum/errors/server";
import { Post } from "../../domain/post";
import { Queries } from "@dddforum/api/posts";
import { PostReadModel } from "../../domain/postReadModel";
import { DomainEvent } from "@dddforum/core";

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

  async findPosts(query: Queries.GetPostsQuery): Promise<PostReadModel[]> {
    return this.posts;
  }

  public static createWithSeedData (): InMemoryPostsRepository {
    // Put seed data here
    return new InMemoryPostsRepository();
  }

  public async save(post: Post): Promise<void | ServerErrors.DatabaseError> {

    return Promise.resolve();
    
  }

  public async getPostDetailsById(id: string): Promise<PostReadModel | null> {
    return this.posts.find(post => post.id === id) || null;
  }
}
