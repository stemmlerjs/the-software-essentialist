
import { ServerErrors, CustomError, ApplicationErrors } from "@dddforum/errors";
import { EmailAlreadyInUseException, UsernameAlreadyTakenException, UserNotFoundException } from "./usersExceptions";
import { Request, Response, NextFunction } from "express";
import { UserResponse } from "@dddforum/api/users";

// Todo: refactor all of these to use the new error handling system

export function userErrorHandler(
  error: CustomError,
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
        code: new ApplicationErrors.ValidationError(error.message)
      },
    };
    return res.status(400).json(responseBody);
  }

  if (error.type === "UsernameAlreadyTakenException") {
    responseBody = {
      success: false,
      data: null,
      error: {
        code: new UsernameAlreadyTakenException(error.message)
      },
    };
    return res.status(409).json(responseBody);
  }

  if (error.type === "EmailAlreadyInUseException") {
    responseBody = {
      success: false,
      data: null,
      error: {
        code: new EmailAlreadyInUseException(error.message)
      },
    };
    return res.status(409).json(responseBody);
  }

  if (error.type === "UserNotFoundException") {
    responseBody = {
      success: false,
      data: null,
      error: {
        code: new UserNotFoundException(error.message)
      },
    };
    return res.status(404).json(responseBody);
  }

  responseBody = {
    success: false,
    data: null,
    error: {
      code: new ServerErrors.ServerErrorException(error.message)
    },
  };

  return res.status(500).json(responseBody);
}
