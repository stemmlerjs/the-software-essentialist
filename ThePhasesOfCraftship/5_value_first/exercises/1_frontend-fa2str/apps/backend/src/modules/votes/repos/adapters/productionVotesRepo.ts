
import { Prisma, PrismaClient } from "@prisma/client";
import { PostVote } from "../../../posts/domain/postVote";
import { CommentVote } from "../../../comments/domain/commentVote";
import { VoteRepository } from "../ports/voteRepository";
import { MemberCommentVotesRoundup } from "../../domain/memberCommentVotesRoundup";
import { MemberPostVotesRoundup } from "../../domain/memberPostVotesRoundup";
import { DomainEvent } from "@dddforum/core";
import { EventOutboxTable } from "@dddforum/outbox";

export class ProductionVotesRepository implements VoteRepository {
  constructor (private prisma: PrismaClient, private eventsTable: EventOutboxTable) {
  }

  async getMemberCommentVotesRoundup(memberId: string): Promise<MemberCommentVotesRoundup> {
    const [allCommentsCount, allCommentsUpvoteCount, allCommentsDownvoteCount] = await Promise.all([
      this.prisma.commentVote.count({
        where: { memberId },
      }),
      this.prisma.commentVote.count({
        where: { 
          commentBelongsTo: {
            memberId,
          },
          value: 1
        },
      }),
      this.prisma.commentVote.count({
        where: { 
          commentBelongsTo: {
            memberId,
          },
          value: -1
        },
      })
    ])

    const roundup = MemberCommentVotesRoundup.toDomain({
      memberId, allCommentsCount, allCommentsUpvoteCount, allCommentsDownvoteCount
    });

    return roundup;
  }

  async getMemberPostVotesRoundup(memberId: string): Promise<MemberPostVotesRoundup> {
    try {
      const [allPostsCount, allPostsUpvoteCount, allPostsDownvoteCount] = await Promise.all([
        this.prisma.postVote.count({
          where: { 
            postBelongsTo: {
              memberId
            }
          },
        }),
        this.prisma.postVote.count({
          where: { 
            postBelongsTo: {
              memberId
            },
            value: 1
          },
        }),
        this.prisma.postVote.count({
          where: { 
            postBelongsTo: {
              memberId
            },
            value: -1
          },
        })
      ])
  
      const roundup = MemberPostVotesRoundup.toDomain({
        memberId, allPostsCount, allPostsUpvoteCount, allPostsDownvoteCount
      });
  
      return roundup;
    } catch (err) {
      console.log(err);
      throw new Error('Error getting member post votes roundup');
      
    }
  }
  
  async findVoteByMemberAndCommentId(memberId: string, commentId: string): Promise<CommentVote | null> {
    const vote = await this.prisma.commentVote.findUnique({
      where: {
        memberId_commentId: {
          memberId,
          commentId
        }
      }
    });

    if (!vote) return null;

    return CommentVote.toDomain({
      id: vote.id,
      memberId: vote.memberId,
      commentId: vote.commentId,
      voteState: vote.value === 1 ? 'Upvoted' : vote.value === -1 ? 'Downvoted' : 'Default'
    });
  }

  async findVoteByMemberAndPostId(memberId: string, postId: string): Promise<PostVote | null> {
    const vote = await this.prisma.postVote.findUnique({
      where: {
        memberId_postId: {
          memberId,
          postId
        }
      }
    });

    if (!vote) return null;

    return PostVote.toDomain({
      id: vote.id,
      memberId: vote.memberId,
      postId: vote.postId,
      voteState: vote.value === 1 ? 'Upvoted' : vote.value === -1 ? 'Downvoted' : 'Default'
    });
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
      return this.prisma.$transaction(async (tx) => {
        await this.save(vote, tx);
        await this.eventsTable.save(events, tx);
      })
    }
}
