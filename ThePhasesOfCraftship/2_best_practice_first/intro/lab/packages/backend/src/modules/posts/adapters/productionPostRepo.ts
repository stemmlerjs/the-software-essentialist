import { PrismaClient } from "@prisma/client";
import { PostDTO } from "../postDTO";
import { PostRepo } from "../postRepo";

export class ProductionPostRepo implements PostRepo {
  constructor (private prisma: PrismaClient) {

  }
  async getPosts(): Promise<PostDTO[]> {
    return [];
  }
}