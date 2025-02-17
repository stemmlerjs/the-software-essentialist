import { Request, Response, NextFunction } from "express";

export const ErrorExceptionType = {
	ValidationError: 'ValidationError',
	StudentNotFound: 'StudentNotFound',
	ClassNotFound: 'ClassNotFound',
	AssignmentNotFound: 'AssignmentNotFound',
	ServerError: 'ServerError',
	ClientError: 'ClientError',
	StudentAlreadyEnrolled: 'StudentAlreadyEnrolled'
}

export class InvalidRequestBodyException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidRequestBodyException';
	}
}

export class StudentNotFoundException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'StudentNotFoundException';
	}
}

export type ErrorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => Response;

export function errorHandler(
	error: Error,
	req: Request,
	res: Response,
  ) {
  
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
  
	return res.status(500).json({
	  error: ErrorExceptionType.ServerError,
	  data: undefined,
	  success: false,
	  message: error.message,
	});
  }