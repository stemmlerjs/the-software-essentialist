import { ApplicationErrors, ApplicationEntity } from "@dddforum/errors/application";
import { ServerErrors } from "@dddforum/errors/server";
import { CustomError } from "@dddforum/errors/custom";
import { EmailAlreadyInUseException, UsernameAlreadyTakenException, UserNotFoundException } from "./usersExceptions";
import { Request, Response, NextFunction } from "express";
import { UserResponse } from "@dddforum/api/users";

interface ErrorWithEntity extends CustomError {
  missingEntityType?: ApplicationEntity;
}

export function userErrorHandler(
  error: ErrorWithEntity,
  _: Request,
  res: Response,
  _next: NextFunction,
): Response<UserResponse> {
  let responseBody: UserResponse;

  // Handle validation errors
  if (
    error.type === "InvalidRequestBodyError" ||
    error.type === "InvalidParamsError"
  ) {
    return res.status(400).json({
      success: false,
      data: null,
      error: {
        message: error.message,
        code: new ApplicationErrors.ValidationError(error.message)
      },
    });
  }

  // Handle not found errors
  if (error instanceof ApplicationErrors.NotFoundError) {
    responseBody = {
      success: false,
      data: null,
      error: {
        code: new ApplicationErrors.NotFoundError(error.missingEntityType || 'user')
      },
    };
    return res.status(404).json(responseBody);
  }

  // Handle conflict errors
  if (error instanceof EmailAlreadyInUseException) {
    responseBody = {
      success: false,
      data: null,
      error: {
        code: new ApplicationErrors.ConflictError('user', error.message)
      },
    };
    return res.status(409).json(responseBody);
  }

  if (error instanceof UserNotFoundException) {
    responseBody = {
      success: false,
      data: null,
      error: {
        code: new ApplicationErrors.NotFoundError('user', error.message)
      },
    };
    return res.status(404).json(responseBody);
  }

  // Handle all other errors as server errors
  responseBody = {
    success: false,
    data: null,
    error: {
      code: new ServerErrors.GenericServerError(error.message)
    },
  };

  return res.status(500).json(responseBody);
}
