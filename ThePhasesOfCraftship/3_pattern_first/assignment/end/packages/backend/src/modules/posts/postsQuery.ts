import { Request } from "express";
import {
  InvalidRequestParamsException,
  MissingRequestParamsException,
} from "../../shared/exceptions";
import { GetPostsParams } from "@dddforum/shared/src/api/posts";

export class GetPostByIdQuery {
  constructor(private props: { postId: string }) {}

  static fromRequest(req: Request) {
    const postId = req['query'].postId || req['params'].postId;

    if (!postId) {
      throw new MissingRequestParamsException(["postId"]);
    }

    return new GetPostByIdQuery({ postId: postId as string });
  }

  get postId() {
    return this.props.postId;
  }
}

export class GetPostsQuery {
  constructor(private props: GetPostsParams) {}

  static fromRequest(query: Request["query"]) {
    const { sort } = query;

    console.log("sort", sort);

    if (!sort) {
      throw new MissingRequestParamsException(["sort"]);
    }

    if (sort !== "recent" && sort !== "popular") {
      throw new InvalidRequestParamsException(["sort"]);
    }

    return new GetPostsQuery({ sort });
  }

  get sort() {
    return this.props.sort;
  }
}
