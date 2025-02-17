import express, { Request, Response, NextFunction } from 'express'

import { ClassEnrollmentsService } from './class-enrollments.service'
import { InvalidRequestBodyException } from '../shared/errors/exceptions'

export class ClassEnrollmentsController {
	router: express.Router
	classEnrollmentsService: ClassEnrollmentsService
	
	constructor(classEnrollmentsService: ClassEnrollmentsService) {
		this.router = express.Router()
		this.classEnrollmentsService = classEnrollmentsService
		this.setUpRoutes()
	}

	getRouter() {
		return this.router
	}

	private setUpRoutes() {
		this.router.post('/class-enrollments', this.createClassEnrollment)
	}

	async createClassEnrollment(req: Request, res: Response, next: NextFunction) {
		try {
			if (isMissingKeys(req.body, ['studentId', 'classId'])) {
				throw new InvalidRequestBodyException('Missing required fields studentId and classId');
			}
		
			const { studentId, classId } = req.body;
			
			const classEnrollment = await this.classEnrollmentsService.enrollStudent(studentId, classId)

			res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
		} catch (error) {
			next(error)
		}

	}
}