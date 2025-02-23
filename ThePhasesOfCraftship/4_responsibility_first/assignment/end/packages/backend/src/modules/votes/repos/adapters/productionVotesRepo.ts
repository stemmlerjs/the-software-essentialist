
import { PrismaClient } from "@prisma/client";
import { PostVote } from "../../../posts/domain/postVote";
import { CommentVote } from "../../../comments/domain/commentVote";
import { VoteRepository } from "../ports/voteRepository";
import { MemberCommentVotesRoundup } from "../../domain/memberCommentVotesRoundup";
import { MemberPostVotesRoundup } from "../../domain/memberPostVotesRoundup";

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
    // Have this also write to an events table.
    await this.prisma.$transaction(async (prisma) => {
      if (vote instanceof PostVote) {
        await prisma.postVote.upsert({
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
        await prisma.commentVote.upsert({
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

      // Example of writing to an events table
      await prisma.event.create({
        data: {
          type: 'VOTE_SAVED',
          payload: JSON.stringify(vote)
        }
      });
    });
  }
}
