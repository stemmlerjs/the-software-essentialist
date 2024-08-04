import { NextFunction, Request, Response } from "express";
import {
  AssignmentNotFoundException,
  ClassNotFoundException,
  InvalidRequestBodyException,
  StudentAlreadyEnrolledException,
  StudentAssignmentNotFoundException,
  StudentNotFoundException,
} from "./exceptions";
import ErrorExceptionType from "./constants";

export class ErrorExceptionHandler {
  public static handle(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response {
    if (error instanceof InvalidRequestBodyException) {
      return res.status(400).json({
        error: ErrorExceptionType.ValidationError,
        data: undefined,
        success: false,
        message: error.message,
      });
    }

    if (error instanceof StudentNotFoundException) {
      return res.status(404).json({
        error: ErrorExceptionType.StudentNotFound,
        data: undefined,
        success: false,
        message: error.message,
      });
    }

    if (error instanceof ClassNotFoundException) {
      return res.status(404).json({
        error: ErrorExceptionType.ClassNotFound,
        data: undefined,
        success: false,
      });
    }

    if (error instanceof StudentAlreadyEnrolledException) {
      return res.status(400).json({
        error: ErrorExceptionType.StudentAlreadyEnrolled,
        data: undefined,
        success: false,
        message: error.message,
      });
    }

    if (error instanceof AssignmentNotFoundException) {
      return res.status(400).json({
        error: ErrorExceptionType.AssignmentNotFound,
        data: undefined,
        success: false,
        message: error.message,
      });
    }

    if (error instanceof StudentAssignmentNotFoundException) {
      return res.status(400).json({
        error: ErrorExceptionType.StudentAssignmentNotFoundException,
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
}
