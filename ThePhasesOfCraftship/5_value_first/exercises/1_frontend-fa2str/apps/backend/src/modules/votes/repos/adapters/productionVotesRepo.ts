
import { Prisma } from "@prisma/client";
import { PostVote } from "../../../posts/domain/postVote";
import { CommentVote } from "../../../comments/domain/commentVote";
import { VoteRepository } from "../ports/voteRepository";
import { MemberCommentVotesRoundup } from "../../domain/memberCommentVotesRoundup";
import { MemberPostVotesRoundup } from "../../domain/memberPostVotesRoundup";
import { DomainEvent } from "@dddforum/core";
import { EventOutboxTable } from "@dddforum/outbox";
import { Database } from "@dddforum/database";

export class ProductionVotesRepository implements VoteRepository {
  constructor (private database: Database, private eventsTable: EventOutboxTable) {
  }

  async getMemberCommentVotesRoundup(memberId: string): Promise<MemberCommentVotesRoundup> {
    const connection = this.database.getConnection();
    const [allCommentsCount, allCommentsUpvoteCount, allCommentsDownvoteCount] = await Promise.all([
      connection.commentVote.count({
        where: { memberId },
      }),
      connection.commentVote.count({
        where: { 
          commentBelongsTo: {
            memberId,
          },
          value: 1
        },
      }),
      connection.commentVote.count({
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
      const connection = this.database.getConnection();
      const [allPostsCount, allPostsUpvoteCount, allPostsDownvoteCount] = await Promise.all([
        connection.postVote.count({
          where: { 
            postBelongsTo: {
              memberId
            }
          },
        }),
        connection.postVote.count({
          where: { 
            postBelongsTo: {
              memberId
            },
            value: 1
          },
        }),
        connection.postVote.count({
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
    const connection = this.database.getConnection();
    const vote = await connection.commentVote.findUnique({
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
    const connection = this.database.getConnection();
    const vote = await connection.postVote.findUnique({
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
    const connection = this.database.getConnection();
    const prismaInstance = transaction || connection;

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
      const connection = this.database.getConnection();
      return connection.$transaction(async (tx) => {
        await this.save(vote, tx);
        await this.eventsTable.save(events, tx);
      })
    }
}
