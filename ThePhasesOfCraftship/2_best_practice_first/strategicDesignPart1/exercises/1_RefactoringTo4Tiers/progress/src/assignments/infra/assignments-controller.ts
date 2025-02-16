import express, { Request, Response, NextFunction } from 'express';

import {errorHandler} from '../error-handler';
import { InvalidIdentifierException, InvalidRequestBodyException } from '../../shared/errors/exceptions';
import { prisma } from '../../database';
import { StudentNotFoundException } from '../../students/exceptions';
import { AssignmentNotFoundException, InvalidGradeException } from '../exceptions';

export class AssignmentsController {
	router: express.Router
	
	constructor() {
		this.router = express.Router();
		this.setupRoutes();
		this.setupErrorHandler();
	}

	getRouter() {
		return this.router;
	}

	private setupRoutes() {
		this.router.post('/', this.createAssignment);
		this.router.post('/student-assignments', this.assignStudentToAssignment);
		this.router.post('/student-assignments/submit', this.submitStudentAssignment);
		this.router.post('/student-assignments/grade', this.gradeStudentAssignment);
		this.router.get('/:id', this.getAssignment);
	}

	private setupErrorHandler() {
		this.router.use(errorHandler);
	}

	async createAssignment(req: Request, res: Response, next: NextFunction) {
		try {
			if (isMissingKeys(req.body, ['classId', 'title'])) {
				throw new InvalidRequestBodyException('Missing required fields classId and title');
			}
		
			const { classId, title } = req.body;
		
			const assignment = await prisma.assignment.create({
				data: {
					classId,
					title
				}
			});
		
			res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
		} catch (error) {
			next(error)
		}
	}

	async assignStudentToAssignment(req: Request, res: Response, next: NextFunction) {
		try {
			if (isMissingKeys(req.body, ['studentId', 'assignmentId'])) {
				throw new InvalidRequestBodyException('Missing required fields studentId and assignmentId');
			}
		
			const { studentId, assignmentId, grade } = req.body;
		
			// check if student exists
			const student = await prisma.student.findUnique({
				where: {
					id: studentId
				}
			});
		
			if (!student) {
				throw new StudentNotFoundException();
			}
		
			// check if assignment exists
			const assignment = await prisma.assignment.findUnique({
				where: {
					id: assignmentId
				}
			});
		
			if (!assignment) {
				throw new AssignmentNotFoundException();
			}
		
			const studentAssignment = await prisma.studentAssignment.create({
				data: {
					studentId,
					assignmentId,
				}
			});
		
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
			
			// check if student assignment exists
			const studentAssignment = await prisma.studentAssignment.findUnique({
				where: {
					id
				}
			});
	
			if (!studentAssignment) {
				throw new AssignmentNotFoundException();
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
			next(error)
		}
	}

	async gradeStudentAssignment(req: Request, res: Response, next: NextFunction) {
		try {
	
			if (isMissingKeys(req.body, ['id', 'grade'])) {
				throw new InvalidRequestBodyException('Missing required fields id and grade');
			}
		
			const { id, grade } = req.body;
		
			// validate grade
			if (!['A', 'B', 'C', 'D'].includes(grade)) {
				throw new InvalidGradeException();
			}
			
			// check if student assignment exists
			const studentAssignment = await prisma.studentAssignment.findUnique({
				where: {
					id
				}
			});
		
			if (!studentAssignment) {
				throw new AssignmentNotFoundException();
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
			next(error)
		}
	}

	async getAssignment(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if(!isUUID(id)) {
				throw new InvalidIdentifierException();
			}
			const assignment = await prisma.assignment.findUnique({
				include: {
					class: true,
					studentTasks: true
				},
				where: {
					id
				}
			});
		
			if (!assignment) {
				throw new AssignmentNotFoundException();
			}
		
			res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
		} catch (error) {
			next(error)
		}
	}
}