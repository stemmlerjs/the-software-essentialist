import { NextFunction, Request, Response } from "express";
import {
  InvalidIdentifierException,
  InvalidRequestBodyException,
  ErrorExceptionType
} from "./exceptions";

type ErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => Response;

function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (error instanceof InvalidRequestBodyException) {
    return res.status(400).json({
      error: ErrorExceptionType.ValidationError,
      data: undefined,
      success: false,
      message: error.message,
    });
  }

  if (error instanceof InvalidIdentifierException) {
    return res.status(400).json({
      error: ErrorExceptionType.ValidationError,
      data: undefined,
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    error: ErrorExceptionType.ServerError,
    data: undefined,
    success: false,
    message: error.message,
  });
}

export { errorHandler, ErrorHandler };