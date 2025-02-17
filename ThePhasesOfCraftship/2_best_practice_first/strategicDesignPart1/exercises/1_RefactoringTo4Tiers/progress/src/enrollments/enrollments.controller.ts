import express from 'express';
import { ErrorExceptionType, ErrorHandler } from '../shared/errors';
import { isMissingKeys, parseForResponse } from '../shared/utils';
import { prisma } from '../shared/database';

export class EnrollmentsController {
	router: express.Router
	errorHandler: ErrorHandler

	constructor(errorHandler: ErrorHandler) {
		this.router = express.Router()
		this.errorHandler = errorHandler

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
		
			// check if student exists
			const student = await prisma.student.findUnique({
				where: {
					id: studentId
				}
			});
		
			if (!student) {
				return res.status(404).json({ error: ErrorExceptionType.StudentNotFound, data: undefined, success: false });
			}
		
			// check if class exists
			const cls = await prisma.class.findUnique({
				where: {
					id: classId
				}
			});
	
			// check if student is already enrolled in class
			const duplicatedClassEnrollment = await prisma.classEnrollment.findFirst({
				where: {
					studentId,
					classId
				}
			});
	
			if (duplicatedClassEnrollment) {
				return res.status(400).json({ error: ErrorExceptionType.StudentAlreadyEnrolled, data: undefined, success: false });
			}
		
			if (!cls) {
				return res.status(404).json({ error: ErrorExceptionType.ClassNotFound, data: undefined, success: false });
			}
		
			const classEnrollment = await prisma.classEnrollment.create({
				data: {
					studentId,
					classId
				}
			});
		
			res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
		} catch (error) {
			res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
		}
	}
}