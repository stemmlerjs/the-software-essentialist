import express from 'express';
import { ErrorExceptionType, ErrorHandler } from '../shared/errors';
import { isMissingKeys, isUUID, parseForResponse } from '../shared/utils';
import { StudentAssignmentsService } from './student-assignments.service';

export class StudentAssignmentsController {
	router: express.Router
	errorHandler: ErrorHandler
	studentAssignmentsService: StudentAssignmentsService

	constructor(errorHandler: ErrorHandler) {
		this.router = express.Router()
		this.errorHandler = errorHandler
		this.studentAssignmentsService = new StudentAssignmentsService()

		this.setupRoutes()
		this.setupErrorHandler()
	}

	getRouter() {
		return this.router
	}

	private setupRoutes() {
		this.router.post('/', this.assignStudentToAssignment)
		this.router.post('/submit', this.submitStudentAssignment)
		this.router.post('/grade', this.gradeStudentAssignment)
	}

	private setupErrorHandler() {
		this.router.use(this.errorHandler)
	}

	async assignStudentToAssignment(req: express.Request, res: express.Response, next: express.NextFunction) {
		try {
			if (isMissingKeys(req.body, ['studentId', 'assignmentId'])) {
				return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
			}
		
			const { studentId, assignmentId } = req.body;
		
			const studentAssignment = await this.studentAssignmentsService.assignStudentToAssignment(studentId, assignmentId);
		
			res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
		} catch (error) {
			next(error)
		}
	}

	async submitStudentAssignment(req: express.Request, res: express.Response, next: express.NextFunction) {
		try {
			if (isMissingKeys(req.body, ['id'])) {
				return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
			}
	
			const { id } = req.body;
	
			const studentAssignmentUpdated = await this.studentAssignmentsService.submitAssignment(id);
	
			res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
		} catch (error) {
			next(error)
		}
	}

	async gradeStudentAssignment(req: express.Request, res: express.Response, next: express.NextFunction) {
		try {
			if (isMissingKeys(req.body, ['id', 'grade'])) {
				return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
			}
		
			const { id, grade } = req.body;
		
			const studentAssignmentUpdated = await this.studentAssignmentsService.gradeAssignment(id, grade);
		
			res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
		} catch (error) {
			next(error)
		}
	}
}