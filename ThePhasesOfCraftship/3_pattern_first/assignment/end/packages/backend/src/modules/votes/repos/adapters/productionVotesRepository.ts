import { PrismaClient } from "@prisma/client";
import { VoteRepository } from "../ports/voteRepository";

export class ProductionVotesRepository implements VoteRepository {
  constructor (private prisma: PrismaClient) {
  }
  async findVoteByMemberIdAndCommentId(memberId: string, commentId: string) {
    return null;
  }

  async save(commentVote: any) {
    return;
  }
}
