import { Request, Response, NextFunction } from "express";

// Todo: clean these custom exceptions
import { ApplicationErrors, ApplicationErrorName } from "@dddforum/errors/application";

type ErrorAPIResponse = {
  success: false;
  data: undefined;
  error: {
    message: string;
    code: ApplicationErrorName
  }
}

export function votesErrorHandler(
  error: Error,
  _: Request,
  res: Response,
  _next: NextFunction,
): Response<ErrorAPIResponse> { // Updated return type

  switch ((error as ApplicationErrors.AnyApplicationError).name) {
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
