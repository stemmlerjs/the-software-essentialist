import { Request, Response, NextFunction } from "express";

// Todo: clean these custom exceptions
import { CustomException } from "../../shared/exceptions";
import { ApplicationError, ApplicationErrorName } from "@dddforum/shared/src/errors";
import { PostsAPIResponse } from "@dddforum/shared/src/api/posts";

type ErrorAPIResponse = {
  success: false;
  data: undefined;
  error: {
    message: string;
    code: ApplicationErrorName
  }
}

export function postsErrorHandler(
  error: Error,
  _: Request,
  res: Response,
  _next: NextFunction,
): Response<ErrorAPIResponse> { // Updated return type

  switch ((error as ApplicationError).name) {
    case "PermissionError":
      return res.status(403).json({
        success: false,
        data: undefined,
        error: {
          code: error.name,
          message: error.message,
        }
      });
    case "ValidationError":
      return res.status(400).json({
        success: false,
        data: undefined,
        error: {
          code: error.name,
          message: error.message,
        }
      } as ErrorAPIResponse);
    case 'ServerError':
    default:
      return res.status(500).json({
        success: false,
        data: undefined,
        error: {
          code: error.name,
          message: error.message,
        }
      } as ErrorAPIResponse);
  }
}
