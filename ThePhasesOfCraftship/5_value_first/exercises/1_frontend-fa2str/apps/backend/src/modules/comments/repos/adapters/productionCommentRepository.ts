
import { CommentRepository } from "../ports/commentRepository";
import { Database } from "@dddforum/database";

export class ProductionCommentsRepository implements CommentRepository {
  constructor (private database: Database) {
  }
  
  async getCommentById(commentId: string) {
    return null;
  }
}
