import { CommentVote } from "../../domain/commentVote";

export interface VoteRepository {
  findVoteByMemberIdAndCommentId (memberId: string, commentId: string): Promise<CommentVote | null>;

  save (commentVote: CommentVote): Promise<void>;
}
