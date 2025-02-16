import { Request, Response, NextFunction } from 'express';

import { errorHandler as commonErrorHandler } from '../shared/errors/error-handler';
import { AssignmentNotFoundException, ErrorExceptionType, InvalidGradeException } from './exceptions';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof AssignmentNotFoundException) {
		return res.status(404).json({ 
			error: ErrorExceptionType.AssignmentNotFound, 
			data: undefined, 
			success: false,
			message: err.message
		});	
	}

	if (err instanceof InvalidGradeException) {
		return res.status(400).json({ 
			error: ErrorExceptionType.InvalidGrade, 
			data: undefined, 
			success: false,
			message: err.message
		});
	}

	return commonErrorHandler(err, req, res, next);
}