import { Request, Response, NextFunction } from "express";
import { ErrorExceptionType, StudentNotFoundException } from "./exceptions";

import { errorHandler as commonErrorHandler } from '../shared/errors/error-handler'

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof StudentNotFoundException) {
		return res.status(404).json({
			error: ErrorExceptionType.StudentNotFound,
			data: undefined,
			success: false,
			message: error.message,
		});
	}

	return commonErrorHandler(error, req, res, next);
}