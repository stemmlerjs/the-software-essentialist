import { PrismaClient } from "@prisma/client";
import { CommentRepository } from "../ports/commentRepository";

export class ProductionCommentsRepository implements CommentRepository {
  constructor (private prisma: PrismaClient) {
  }
  
  async getCommentById(commentId: string) {
    return null;
  }
}
