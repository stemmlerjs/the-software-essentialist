import express, { NextFunction } from 'express';

import { prisma } from '../../database';
import { InvalidIdentifierException, InvalidRequestBodyException } from '../../shared/errors/exceptions';

import { errorHandler } from '../error-handler';
import { StudentNotFoundException } from '../exceptions';

export class StudentsController {
	router: express.Router

	constructor() {
		this.router = express.Router();
		this.setupRoutes();
	  	this.setupErrorHandler();
	}

	getRouter() {
		return this.router;
	}

	async createStudent(req: express.Request, res: express.Response, next: NextFunction) {
		try {
			if (isMissingKeys(req.body, ['name'])) {
				throw new InvalidRequestBodyException('Missing required fields');
			}
	
			const { name } = req.body;
	
			const student = await prisma.student.create({
				data: {
					name
				}
			});
	
			res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
		} catch (error) {
			next(error)
		}
	}

	async getStudents(req: express.Request, res: express.Response, next: NextFunction) {
		try {
			const students = await prisma.student.findMany({
				include: {
					classes: true,
					assignments: true,
					reportCards: true
				}, 
				orderBy: {
					name: 'asc'
				}
			});
			res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
		} catch (error) {
			next(error)
		}
	}

	async getStudent(req: express.Request, res: express.Response, next: NextFunction) {
		try {
			const { id } = req.params;
			
			if(!isUUID(id)) {
				throw new InvalidIdentifierException('Invalid ID');
			}
			
			const student = await prisma.student.findUnique({
				where: {
					id
				},
				include: {
					classes: true,
					assignments: true,
					reportCards: true
				}
			});
		
			if (!student) {
				throw new StudentNotFoundException();
			}
		
			res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
		} catch (error) {
			next(error)
		}
	}

	async getStudentAssignments(req: express.Request, res: express.Response, next: NextFunction) {
			try {
				const { id } = req.params;
				if(!isUUID(id)) {
					throw new InvalidIdentifierException();
				}
		
				// check if student exists
				const student = await prisma.student.findUnique({
					where: {
						id
					}
				});
		
				if (!student) {
					throw new StudentNotFoundException();
				}
		
				const studentAssignments = await prisma.studentAssignment.findMany({
					where: {
						studentId: id,
						status: 'submitted'
					},
					include: {
						assignment: true
					},
				});
			
				res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
			} catch (error) {
				next(error)
			}
	}

	async getStudentGrades(req: express.Request, res: express.Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if(!isUUID(id)) {
				throw new InvalidIdentifierException();
			}
	
			// check if student exists
			const student = await prisma.student.findUnique({
				where: {
					id
				}
			});
	
			if (!student) {
				throw new StudentNotFoundException();
			}
	
			const studentAssignments = await prisma.studentAssignment.findMany({
				where: {
					studentId: id,
					status: 'submitted',
					grade: {
						not: null
					}
				},
				include: {
					assignment: true
				},
			});
		
			res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
		} catch (error) {
			next(error)
		}
	}

	private setupErrorHandler() {
		this.router.use(errorHandler);
	}
  
	private setupRoutes() {
		this.router.post("/students", this.createStudent);
		this.router.get("/students", this.getStudents);
		this.router.get("/students/:id", this.getStudent);
		this.router.get("/students/:id/assignments", this.getStudentAssignments);
		this.router.get("/students/:id/grades", this.getStudentGrades);
	}
  }