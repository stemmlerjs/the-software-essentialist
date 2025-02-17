import express, { NextFunction } from 'express';

import { InvalidIdentifierException, InvalidRequestBodyException } from '../shared/errors/exceptions';
import { StudentAssignmentsService } from '../student-assignments/student-assignments.service';

import { StudentsService } from './students.service';
import { errorHandler } from './error-handler';

export class StudentsController {
	router: express.Router
	studentsService: StudentsService
	studentAssignmentsService: StudentAssignmentsService

	constructor(studentsService: StudentsService, studentAssignmentsService: StudentAssignmentsService) {
		this.router = express.Router();
		this.studentsService = studentsService;
		this.studentAssignmentsService = studentAssignmentsService;
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
	
			const student =  await this.studentsService.createStudent(name);
			
			res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
		} catch (error) {
			next(error)
		}
	}

	async getStudents(req: express.Request, res: express.Response, next: NextFunction) {
		try {
			const students = await this.studentsService.getStudents();
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
			
			const student = await this.studentsService.getStudent(id);
		
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
		
				const studentAssignments = await this.studentAssignmentsService.getStudentAssignments(id);
			
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
	
			const studentAssignments = await this.studentAssignmentsService.getStudentAssignments(id, true);
		
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