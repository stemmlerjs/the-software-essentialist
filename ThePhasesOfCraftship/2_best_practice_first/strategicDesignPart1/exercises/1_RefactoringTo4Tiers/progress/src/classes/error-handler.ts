import { Request, Response, NextFunction } from 'express'

import { errorHandler as commonErrorHandler } from '../shared/errors/error-handler'
import { ClassNotFoundException, ErrorExceptionType, StudentAlreadyEnrolledException } from './exceptions';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof ClassNotFoundException) {
		return res.status(404).json({
			error: ErrorExceptionType.ClassNotFound,
			data: undefined,
			success: false,
			message: error.message,
		})
	}
	
	if (error instanceof StudentAlreadyEnrolledException) {
		return res.status(400).json({
			error: ErrorExceptionType.StudentAlreadyEnrolled,
			data: undefined,
			success: false,
			message: error.message,
		});
	}
	
	return commonErrorHandler(error, req, res, next)
}