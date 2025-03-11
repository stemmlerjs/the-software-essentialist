import { Request } from "express";
import {
  MissingRequestParamsException,
} from "../../shared/exceptions";
import { CreatePostInput } from "@dddforum/api/posts";

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
