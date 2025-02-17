import express from 'express';
import { ErrorExceptionType, ErrorHandler } from '../shared/errors';
import { isMissingKeys, parseForResponse } from '../shared/utils';
import { EnrollmentsService } from './enrollments.service';

export class EnrollmentsController {
	router: express.Router
	errorHandler: ErrorHandler
	enrollmentsService: EnrollmentsService

	constructor(errorHandler: ErrorHandler, enrollmentsService: EnrollmentsService) {
		this.router = express.Router()
		this.errorHandler = errorHandler
		this.enrollmentsService = enrollmentsService

		this.setupRoutes()
		this.setupErrorHandler()
	}

	getRouter() {
		return this.router
	}

	private setupRoutes() {
		this.router.post('/', this.enrollStudentInClass)
	}

	private setupErrorHandler() {
		this.router.use(this.errorHandler)
	}

	async enrollStudentInClass(req: express.Request, res: express.Response, next: express.NextFunction) {
		try {
			if (isMissingKeys(req.body, ['studentId', 'classId'])) {
				return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
			}
		
			const { studentId, classId } = req.body;
		
			const classEnrollment = await this.enrollmentsService.enrollStudentInClass(studentId, classId);
		
			res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
		} catch (error) {
			next(error)
		}
	}
}