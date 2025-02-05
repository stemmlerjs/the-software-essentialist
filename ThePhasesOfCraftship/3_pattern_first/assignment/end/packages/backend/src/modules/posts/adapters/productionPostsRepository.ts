import { PrismaClient } from "@prisma/client";
import { PostsRepository } from "../ports/postsRepository";
import { PostReadModel } from "../domain/postReadModel";

export class ProductionPostsRepository implements PostsRepository {
  constructor(private prisma: PrismaClient) {}
  async findPosts(_sort: string): Promise<PostReadModel[]> {
    return [];
  }
}
