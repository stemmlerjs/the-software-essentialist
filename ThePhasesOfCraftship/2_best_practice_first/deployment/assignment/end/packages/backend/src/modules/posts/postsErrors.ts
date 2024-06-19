import { Request, Response, NextFunction } from "express";
import { CustomException } from "../../shared/exceptions";
import { PostsResponse } from "@dddforum/shared/src/api/posts";

export function postsErrorHandler(
  error: CustomException,
  _: Request,
  res: Response,
  _next: NextFunction,
): Response<PostsResponse> {
  const responseBody = {
    success: false,
    data: [],
    error: {
      message: error.message,
      code: "ServerError",
    },
  };
  return res.status(500).json(responseBody);
}
