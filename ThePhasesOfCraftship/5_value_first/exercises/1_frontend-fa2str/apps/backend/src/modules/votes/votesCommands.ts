
import { VoteOnCommentInput, VoteOnPostInput } from "@dddforum/api/votes";
import { MissingRequestParamsException } from "../../shared/exceptions";
import { Request } from "express";

export class UpdateMemberReputationScoreCommand {
  constructor(
    public readonly props: {
      memberId: string;
    }
  ) {}
}

export class VoteOnCommentCommand {
  constructor(public props: VoteOnCommentInput) {}

  static fromRequest(body: Request['body']) {
    const { voteType, commentId, memberId } = body;

    if (!commentId) {
      throw new MissingRequestParamsException(["commentId"]);
    }

    if (!voteType) {
      throw new MissingRequestParamsException(["voteType"]);
    }

    if (!memberId) {
      throw new MissingRequestParamsException(["memberId"]);
    }

    return new VoteOnCommentCommand({ ...body });
  }
}

export class VoteOnPostCommand {
  constructor(public props: VoteOnPostInput) {}

  static fromRequest(body: Request['body']) {
    const { voteType, postId, memberId } = body;

    if (!postId) {
      throw new MissingRequestParamsException(["postId"]);
    }

    if (!voteType) {
      throw new MissingRequestParamsException(["voteType"]);
    }

    if (!memberId) {
      throw new MissingRequestParamsException(["memberId"]);
    }

    return new VoteOnCommentCommand({ ...body });
  }
}

