import express, { Request, Response, NextFunction} from 'express'

import { prisma } from '../../database';
import { InvalidIdentifierException, InvalidRequestBodyException } from '../../shared/errors/exceptions';

import { errorHandler } from '../error-handler';
import { StudentNotFoundException } from '../../students/exceptions';
import { ClassNotFoundException, StudentAlreadyEnrolledException } from '../exceptions';

export class ClassesController {
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
		this.router.post('/classes', this.createClass);
		this.router.post('/class-enrollments', this.enrollStudent);
		this.router.get('/classes/:id/assignments', this.getClassAssignments);
	}

	private setupErrorHandler() {
		this.router.use(errorHandler);
	}

	async createClass(req: Request, res: Response, next: NextFunction) {
		try {
			if (isMissingKeys(req.body, ['name'])) {
				throw new InvalidRequestBodyException('Missing name field');
			}
		
			const { name } = req.body;
		
			const cls = await prisma.class.create({
				data: {
					name
				}
			});
		
			res.status(201).json({ error: undefined, data: parseForResponse(cls), success: true });
		} catch (error) {
			next(error)
		}
	}

	async enrollStudent(req: Request, res: Response, next: NextFunction) {
		try {
			if (isMissingKeys(req.body, ['studentId', 'classId'])) {
				throw new InvalidRequestBodyException('Missing required fields studentId and classId');
			}
		
			const { studentId, classId } = req.body;
		
			// check if student exists
			const student = await prisma.student.findUnique({
				where: {
					id: studentId
				}
			});
		
			if (!student) {
				throw new StudentNotFoundException();
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
				throw new StudentAlreadyEnrolledException();
			}
		
			if (!cls) {
				throw new ClassNotFoundException();
			}
		
			const classEnrollment = await prisma.classEnrollment.create({
				data: {
					studentId,
					classId
				}
			});
		
			res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
		} catch (error) {
			next(error)
		}
	}

	async getClassAssignments(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if(!isUUID(id)) {
				throw new InvalidIdentifierException('Invalid ID');
			}
	
			// check if class exists
			const cls = await prisma.class.findUnique({
				where: {
					id
				}
			});
	
			if (!cls) {
				throw new ClassNotFoundException();
			}
	
			const assignments = await prisma.assignment.findMany({
				where: {
					classId: id
				},
				include: {
					class: true,
					studentTasks: true
				}
			});
		
			res.status(200).json({ error: undefined, data: parseForResponse(assignments), success: true });
		} catch (error) {
			next(error)
		}
	}
}