import express from 'express';
import { ErrorExceptionType, ErrorHandler } from '../shared/errors';
import { isMissingKeys, isUUID, parseForResponse } from '../shared/utils';
import { prisma } from '../shared/database';

export class StudentAssignmentsController {
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
		
			const { studentId, assignmentId, grade } = req.body;
		
			// check if student exists
			const student = await prisma.student.findUnique({
				where: {
					id: studentId
				}
			});
		
			if (!student) {
				return res.status(404).json({ error: ErrorExceptionType.StudentNotFound, data: undefined, success: false });
			}
		
			// check if assignment exists
			const assignment = await prisma.assignment.findUnique({
				where: {
					id: assignmentId
				}
			});
		
			if (!assignment) {
				return res.status(404).json({ error: ErrorExceptionType.AssignmentNotFound, data: undefined, success: false });
			}
		
			const studentAssignment = await prisma.studentAssignment.create({
				data: {
					studentId,
					assignmentId,
				}
			});
		
			res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
		} catch (error) {
			res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
		}
	}

	async submitStudentAssignment(req: express.Request, res: express.Response, next: express.NextFunction) {
		try {
			if (isMissingKeys(req.body, ['id'])) {
				return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
			}
	
			const { id } = req.body;
			
			// check if student assignment exists
			const studentAssignment = await prisma.studentAssignment.findUnique({
				where: {
					id
				}
			});
	
			if (!studentAssignment) {
				return res.status(404).json({ error: ErrorExceptionType.AssignmentNotFound, data: undefined, success: false });
			}
	
			const studentAssignmentUpdated = await prisma.studentAssignment.update({
				where: {
					id
				},
				data: {
					status: 'submitted'
				}
			});
	
			res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
		} catch (error) {
			res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
		}
	}

	async gradeStudentAssignment(req: express.Request, res: express.Response, next: express.NextFunction) {
		try {
			if (isMissingKeys(req.body, ['id', 'grade'])) {
				return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
			}
		
			const { id, grade } = req.body;
		
			// validate grade
			if (!['A', 'B', 'C', 'D'].includes(grade)) {
				return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
			}
			
			// check if student assignment exists
			const studentAssignment = await prisma.studentAssignment.findUnique({
				where: {
					id
				}
			});
		
			if (!studentAssignment) {
				return res.status(404).json({ error: ErrorExceptionType.AssignmentNotFound, data: undefined, success: false });
			}
		
			const studentAssignmentUpdated = await prisma.studentAssignment.update({
				where: {
					id
				},
				data: {
					grade,
				}
			});
		
			res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
		} catch (error) {
			res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
		}
	}
}