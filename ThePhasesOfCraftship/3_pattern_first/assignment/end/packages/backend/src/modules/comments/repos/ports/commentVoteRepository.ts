
import { PostVote } from "../../../posts/domain/postVote";
import { MemberCommentVotesRoundup } from "../../../votes/domain/memberCommentVotesRoundup";
import { MemberPostVotesRoundup } from "../../../votes/domain/memberPostVotesRoundup";
import { CommentVote } from "../../domain/commentVote";

export interface VoteRepository {
  findVoteByMemberIdAndCommentId (memberId: string, commentId: string): Promise<CommentVote | null>;
  // Always keep in mind the extremes. What if a member's comment has 1000 comments? 
  // That's why we use a roundup.
  getMemberCommentVotesRoundup(memberId: string): Promise<MemberCommentVotesRoundup>;
  getMemberPostVotesRoundup(memberId: string): Promise<MemberPostVotesRoundup>;
  save (postOrCommentVote: CommentVote | PostVote): Promise<void>;
}
