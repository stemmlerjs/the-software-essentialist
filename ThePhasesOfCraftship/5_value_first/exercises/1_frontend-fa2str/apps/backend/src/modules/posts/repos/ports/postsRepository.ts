
import { ServerErrors } from "@dddforum/errors/src/server";
import { PostReadModel } from "../../domain/postReadModel";
import { Post } from "../../domain/post";
import { Queries } from "@dddforum/api/src/posts"
import { DomainEvent } from "@dddforum/core;

export interface PostsRepository {
  findPosts(query: Queries.GetPostsQuery): Promise<PostReadModel[]>;
  save (post: Post): Promise<void | ServerErrors.DatabaseError>;
  getPostById (id: string): Promise<Post | null>;
  getPostDetailsById (id: string): Promise<PostReadModel | null>;
  saveAggregateAndEvents(post: Post, events: DomainEvent[]): Promise<void>;
}
