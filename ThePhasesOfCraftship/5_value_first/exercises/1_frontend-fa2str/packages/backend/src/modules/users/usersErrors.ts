import { Request, Response, NextFunction } from "express";
import { UserResponse } from "@dddforum/shared/src/api/users";
import { CustomException } from "../../shared/exceptions";
import { ServerError, ValidationError } from "@dddforum/shared/src/errors";
import { EmailAlreadyInUseException, UsernameAlreadyTakenException, UserNotFoundException } from "./usersExceptions";
import { ErrorRequestHandler } from 'express';

// Todo: refactor all of these to use the new error handling system

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
        code: new ValidationError(error.message)
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
      code: new ServerError(error.message)
    },
  };

  return res.status(500).json(responseBody);
}
