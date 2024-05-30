import { Request, Response, NextFunction } from "express";
import { CustomException } from "../exceptions";
import { CreateUserResponse } from "@dddforum/shared/src/api/users";

export type ErrorHandler = (
  error: CustomException,
  req: Request,
  res: Response,
  next: NextFunction,
) => Response;

export function errorHandler(
  error: CustomException,
  _: Request,
  res: Response,
  _next: NextFunction,
): Response<CreateUserResponse> {
  let responseBody: CreateUserResponse;
  if (error.type === "InvalidRequestBodyException") {
    responseBody = {
      success: false,
      data: null,
      error: {
        message: error.message,
        code: "ValidationError",
      },
    };
    return res.status(400).json(responseBody);
  }

  if (error.type === "UsernameAlreadyTakenException") {
    responseBody = {
      success: false,
      data: null,
      error: {
        code: "UsernameAlreadyTaken",
      },
    };
    return res.status(409).json(responseBody);
  }

  if (error.type === "EmailAlreadyInUseException") {
    responseBody = {
      success: false,
      data: null,
      error: {
        code: "EmailAlreadyInUse",
      },
    };
    return res.status(409).json(responseBody);
  }

  responseBody = {
    success: false,
    data: null,
    error: {
      code: "ServerError",
    },
  };

  return res.status(500).json(responseBody);
}
