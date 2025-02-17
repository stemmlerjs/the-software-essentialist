import express, { Request, Response, NextFunction } from 'express';

import { InvalidRequestBodyException } from '../shared/errors/exceptions';
import { errorHandler } from '../shared/errors/error-handler';
import { StudentAssignmentsService } from './student-assignments.service';

export class StudentAssignmentsController {
	router: express.Router
	studentAssignmentsService: StudentAssignmentsService
	
	constructor(studentAssignmentsService: StudentAssignmentsService) {
		this.router = express.Router();
		this.studentAssignmentsService = studentAssignmentsService;
		this.setupRoutes();
		this.setupErrorHandler()
	}

	getRouter() {
		return this.router;
	}

	private setupRoutes() {
		this.router.post('/student-assignments', this.assignStudentToAssignment);
		this.router.post('/student-assignments/submit', this.submitStudentAssignment);
		this.router.post('/student-assignments/grade', this.gradeStudentAssignment);
	}

	private setupErrorHandler() {
		this.router.use(errorHandler);
	}
	
	async assignStudentToAssignment(req: Request, res: Response, next: NextFunction) {
		try {
			if (isMissingKeys(req.body, ['studentId', 'assignmentId'])) {
				throw new InvalidRequestBodyException('Missing required fields studentId and assignmentId');
			}
		
			const { studentId, assignmentId } = req.body;
	
			const studentAssignment = await this.studentAssignmentsService.assignStudent(studentId, assignmentId);
		
			res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
		} catch (error) {
			next(error)
		}
	}

	async submitStudentAssignment(req: Request, res: Response, next: NextFunction) {
		try {
			if (isMissingKeys(req.body, ['id'])) {
				throw new InvalidRequestBodyException('Missing required field id');
			}
	
			const { id } = req.body;
	
			const studentAssignmentUpdated = await this.studentAssignmentsService.submitAssignment(id)
	
			res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
		} catch (error) {
			next(error)
		}
	}

	async gradeStudentAssignment(req: Request, res: Response, next: NextFunction) {
		try {
	
			if (isMissingKeys(req.body, ['id', 'grade'])) {
				throw new InvalidRequestBodyException('Missing required fields id and grade');
			}
		
			const { id, grade } = req.body;
		
			const studentAssignmentUpdated = await this.studentAssignmentsService.gradeAssignment(id, grade);
		
			res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
		} catch (error) {
			next(error)
		}
	}
}