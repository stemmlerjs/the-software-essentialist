import { Request } from "express";
import {
  MissingRequestParamsException,
} from "../../shared/exceptions";
import { CreatePostInput, VoteOnCommentInput } from "@dddforum/shared/src/api/posts";

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

export class CreatePostCommand {

  constructor(public props: CreatePostInput) {}

  static fromRequest(body: Request['body']) {
    const { title, postType, memberId } = body;

    if (!memberId) {
      throw new MissingRequestParamsException(["memberId"]);
    }

    if (!title) {
      throw new MissingRequestParamsException(["title"]);
    }

    if (!postType) {
      throw new MissingRequestParamsException(["postType"]);
    }

    return new CreatePostCommand({ ...body });
  }
}
