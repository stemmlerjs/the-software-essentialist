import { Request } from "express";
import {
  MissingRequestParamsException,
} from "../../shared/exceptions";
import { CreatePostInput } from "@dddforum/shared/src/api/posts";

export class CreatePostCommand {

  constructor(public props: CreatePostInput) {}

  static fromRequest(body: Request['body']) {
    const { title, postType } = body;

    if (!title) {
      throw new MissingRequestParamsException(["title"]);
    }

    if (!postType) {
      throw new MissingRequestParamsException(["postType"]);
    }

    return new CreatePostCommand({ ...body });
  }
}
