import { PrismaClient } from "@prisma/client";
import { VoteRepository } from "../ports/commentVoteRepository";
import { MemberCommentVotesRoundup } from "../../../votes/domain/memberCommentVotesRoundup";
import { MemberPostVotesRoundup } from "../../../votes/domain/memberPostVotesRoundup";

// TODO: Move this

export class ProductionVotesRepository implements VoteRepository {
  constructor (private prisma: PrismaClient) {
  }

  getMemberCommentVotesRoundup(memberId: string): Promise<MemberCommentVotesRoundup> {
    throw new Error("Method not implemented.");
  }

  getMemberPostVotesRoundup(memberId: string): Promise<MemberPostVotesRoundup> {
    throw new Error("Method not implemented.");
  }
  
  async findVoteByMemberIdAndCommentId(memberId: string, commentId: string) {
    return null;
  }

  async save(commentVote: any) {
    return;
  }
}
