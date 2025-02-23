
import { Prisma, PrismaClient } from "@prisma/client";
import { PostVote } from "../../../posts/domain/postVote";
import { CommentVote } from "../../../comments/domain/commentVote";
import { VoteRepository } from "../ports/voteRepository";
import { MemberCommentVotesRoundup } from "../../domain/memberCommentVotesRoundup";
import { MemberPostVotesRoundup } from "../../domain/memberPostVotesRoundup";
import { DomainEvent } from "@dddforum/shared/src/core/domainEvent";
import { EventsTable } from "../../../../shared/events/ports/eventTable";

export class ProductionVotesRepository implements VoteRepository {
  constructor (private prisma: PrismaClient, private eventsTable: EventsTable) {
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

  async save(vote: PostVote | CommentVote, transaction?: Prisma.TransactionClient) {
    const prismaInstance = transaction || this.prisma;

    if (vote instanceof PostVote) {
      await prismaInstance.postVote.upsert({
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
      await prismaInstance.commentVote.upsert({
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

    async saveAggregateAndEvents(vote: PostVote | CommentVote, events: DomainEvent[]) {
      await this.prisma.$transaction(async (tx) => {
        await this.save(vote, tx);
        await this.eventsTable.save(events, tx);
      })
    }
}
