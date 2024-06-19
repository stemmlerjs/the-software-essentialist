import { PrismaClient } from "@prisma/client";
import { Post } from "@dddforum/shared/src/api/posts";
import { PostsRepository } from "../ports/postsRepository";

export class ProductionPostsRepository implements PostsRepository {
  constructor(private prisma: PrismaClient) {}
  async findPosts(_sort: string): Promise<Post[]> {
    return [];
  }
}
