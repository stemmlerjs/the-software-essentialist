
import { PrismaClient } from "@prisma/client";
import { MemberCommentVotesRoundup } from "../../../votes/domain/memberCommentVotesRoundup";
import { MemberPostVotesRoundup } from "../../../votes/domain/memberPostVotesRoundup";
import { PostVote } from "../../../posts/domain/postVote";
import { CommentVote } from "../../../comments/domain/commentVote";
import { VoteRepository } from "../ports/voteRepository";

export class ProductionVotesRepository implements VoteRepository {
  constructor (private prisma: PrismaClient) {
  }

  getMemberCommentVotesRoundup(memberId: string): Promise<MemberCommentVotesRoundup> {
    throw new Error("Method not implemented.");
  }

  getMemberPostVotesRoundup(memberId: string): Promise<MemberPostVotesRoundup> {
    throw new Error("Method not implemented.");
  }
  
  async findVoteByMemberAndCommentId(memberId: string, commentId: string) {
    return null;
  }

  async findVoteByMemberAndPostId(memberId: string, postId: string) {
    return null;
  }

  async save(vote: PostVote | CommentVote) {
    
    if (vote instanceof PostVote) {
      await this.prisma.postVote.upsert({
        where: {
          memberId_postId: {
            memberId: vote.memberId,
            postId: vote.postId
          }
        },
        update: {
          value: vote.getValue()
        },
        create: {
          memberId: vote.memberId,
          postId: vote.postId,
          value: vote.getValue()
        }
      });
    } else if (vote instanceof CommentVote) {
      await this.prisma.commentVote.upsert({
        where: {
          memberId_commentId: {
            memberId: vote.memberId,
            commentId: vote.commentId
          }
        },
        update: {
          value: vote.getValue()
        },
        create: {
          memberId: vote.memberId,
          commentId: vote.commentId,
          value: vote.getValue()
        }
      });
    }
  }
}
