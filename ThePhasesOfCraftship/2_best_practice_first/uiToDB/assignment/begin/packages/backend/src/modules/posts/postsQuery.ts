import { Request } from "express";
import {
  InvalidRequestParamsException,
  MissingRequestParamsException,
} from "../../shared/exceptions";
import { GetPostsParams } from "@dddforum/shared/src/api/posts";

export class GetPostsQuery {
  constructor(public props: GetPostsParams) {}

  static fromRequest(query: Request["query"]) {
    const { sort } = query;

    if (!sort) {
      throw new MissingRequestParamsException(["sort"]);
    }

    if (sort !== "recent") {
      throw new InvalidRequestParamsException(["sort"]);
    }

    return new GetPostsQuery({ sort });
  }

  get sort() {
    return this.props.sort;
  }
}
