import { Request, Response, NextFunction } from "express";

export const ErrorExceptionType = {
	ValidationError: 'ValidationError',
	StudentNotFound: 'StudentNotFound',
	ClassNotFound: 'ClassNotFound',
	AssignmentNotFound: 'AssignmentNotFound',
	ServerError: 'ServerError',
	ClientError: 'ClientError',
	StudentAlreadyEnrolled: 'StudentAlreadyEnrolled',
	StudentAssignmentNotFound: 'StudentAssignmentNotFound',
	InvalidGrade: 'InvalidGrade'
}

export class InvalidRequestBodyException extends Error {
	constructor(message = 'Invalid request body') {
		super(message);
		this.name = 'InvalidRequestBodyException';
	}
}

export class StudentNotFoundException extends Error {
	constructor(message = 'Student not found') {
		super(message);
		this.name = 'StudentNotFoundException';
	}
}

export class AssignmentNotFoundException extends Error {
	constructor(message = 'Assignment not found') {
		super(message);
		this.name = 'AssignmentNotFoundException';
	}
}

export class ClassNotFoundException extends Error {
	constructor(message = 'Class not found') {
		super(message);
		this.name = 'ClassNotFoundException';
	}
}

export class StudentAlreadyEnrolledException extends Error {
	constructor(message = 'Student already enrolled') {
		super(message);
		this.name = 'StudentAlreadyEnrolledException';
	}
}

export class StudentAssignmentNotFoundException extends Error {
	constructor(message = 'Student assignment not found') {
		super(message);
		this.name = 'StudentAssignmentNotFoundException';
	}
}

export class InvalidGradeException extends Error {
	constructor(message = 'Invalid grade') {
		super(message);
		this.name = 'InvalidGradeException';
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

	if (error instanceof AssignmentNotFoundException) {
		return res.status(404).json({
		  error: ErrorExceptionType.AssignmentNotFound,
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
		  message: error.message,
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

	if (error instanceof StudentAssignmentNotFoundException) {
		return res.status(404).json({
		  error: ErrorExceptionType.StudentAssignmentNotFound,
		  data: undefined,
		  success: false,
		  message: error.message,
		});
	}
  
	if (error instanceof InvalidGradeException) {
	  return res.status(400).json({
		error: ErrorExceptionType.InvalidGrade,
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