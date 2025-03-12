
import { PostVote } from "../../../posts/domain/postVote";
import { MemberCommentVotesRoundup } from "../../domain/memberCommentVotesRoundup";
import { MemberPostVotesRoundup } from "../../domain/memberPostVotesRoundup";
import { CommentVote } from "../../../comments/domain/commentVote";
import { DomainEvent } from "@dddforum/core";

export interface VoteRepository {
  findVoteByMemberAndPostId (memberId: string, postId: string): Promise<PostVote | null>;
  findVoteByMemberAndCommentId (memberId: string, commentId: string): Promise<CommentVote | null>;
  // Always keep in mind the extremes. What if a member's comment has 1000 comments? 
  // That's why we use a roundup.
  getMemberCommentVotesRoundup(memberId: string): Promise<MemberCommentVotesRoundup>;
  getMemberPostVotesRoundup(memberId: string): Promise<MemberPostVotesRoundup>;
  save (postOrCommentVote: CommentVote | PostVote): Promise<void>;
  saveAggregateAndEvents (postOrCommentVote: CommentVote | PostVote, events: DomainEvent[]): Promise<void>;
}
