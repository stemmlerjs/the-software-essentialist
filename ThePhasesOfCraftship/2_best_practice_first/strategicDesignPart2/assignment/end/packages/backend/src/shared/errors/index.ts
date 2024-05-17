import { Request, Response, NextFunction } from "express";
import { CustomException } from "../exceptions";

export const Errors = {
  UsernameAlreadyTaken: "UsernameAlreadyTaken",
  EmailAlreadyInUse: "EmailAlreadyInUse",
  ValidationError: "ValidationError",
  ServerError: "ServerError",
  ClientError: "ClientError",
  UserNotFound: "UserNotFound",
};

export type ErrorHandler = (
  error: CustomException,
  req: Request,
  res: Response,
  next: NextFunction,
) => Response;

export function errorHandler(
  error: CustomException,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error.type === "InvalidRequestBodyException") {
    return res.status(400).json({
      error: Errors.ValidationError,
      data: undefined,
      success: false,
      message: error.message,
    });
  }

  if (error.type === "UsernameAlreadyTakenException") {
    return res.status(409).json({
      error: Errors.UsernameAlreadyTaken,
      data: undefined,
      success: false,
    });
  }

  if (error.type === "EmailAlreadyInUseException") {
    return res.status(409).json({
      error: Errors.EmailAlreadyInUse,
      data: undefined,
      success: false,
    });
  }

  return res.status(500).json({
    error: Errors.ServerError,
    data: undefined,
    success: false,
  });
}
