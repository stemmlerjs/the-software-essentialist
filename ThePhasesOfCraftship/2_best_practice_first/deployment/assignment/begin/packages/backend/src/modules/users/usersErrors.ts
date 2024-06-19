import { Request, Response, NextFunction } from "express";
import { UserResponse } from "@dddforum/shared/src/api/users";
import { CustomException } from "../../shared/exceptions";

export function userErrorHandler(
  error: CustomException,
  _: Request,
  res: Response,
  _next: NextFunction,
): Response<UserResponse> {
  let responseBody: UserResponse;
  if (
    error.type === "InvalidRequestBodyException" ||
    error.type === "InvalidParamsException"
  ) {
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

  if (error.type === "UserNotFoundException") {
    responseBody = {
      success: false,
      data: null,
      error: {
        code: "UserNotFound",
      },
    };
    return res.status(404).json(responseBody);
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
