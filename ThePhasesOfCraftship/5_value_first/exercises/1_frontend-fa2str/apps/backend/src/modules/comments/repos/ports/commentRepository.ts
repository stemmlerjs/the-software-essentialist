import { Comment } from "../../domain/comment";

export interface CommentRepository {
  getCommentById (commentId: string): Promise<Comment | null>;
}
