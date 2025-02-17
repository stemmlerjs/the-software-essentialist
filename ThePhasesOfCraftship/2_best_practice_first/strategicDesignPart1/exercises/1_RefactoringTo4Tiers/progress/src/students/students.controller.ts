import express from 'express';

import { isMissingKeys, isUUID, parseForResponse } from '../shared/utils';
import { prisma } from '../shared/database';
import { ErrorHandler, ErrorExceptionType } from '../shared/errors';
import { StudentsService } from './students.service';

export class StudentsController {
	router: express.Router
    errorHandler: ErrorHandler
    studentsService: StudentsService

	constructor(errorHandler: ErrorHandler) {
		this.router = express.Router();
        this.errorHandler = errorHandler
        this.studentsService = new StudentsService();
		
        this.setupRoutes();
        this.setupErrorHandler();
	}

	getRouter() {
		return this.router;
	}

	private setupRoutes() {
		this.router.post('/', this.createStudent);
        this.router.get('/', this.getStudents);
        this.router.get('/:id', this.getStudent);
        this.router.get('/:id/assignments', this.getStudentAssignments);
        this.router.get('/:id/grades', this.getStudentGrades);
	}

    private setupErrorHandler() {
        this.router.use(this.errorHandler);
    }

	async createStudent(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if (isMissingKeys(req.body, ['name'])) {
                return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
            }
        
            const { name } = req.body;
        
            const student = await this.studentsService.createStudent(name);
        
            res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            next(error)
        }
	}

    async getStudents(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const students = await this.studentsService.getStudents();
            res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
        } catch (error) {
            next(error)
        }
    }

    async getStudent(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
            }
            
            const student = await this.studentsService.getStudent(id);
        
            res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            next(error)
        }
    }

    async getStudentAssignments(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
            }
    
            const studentAssignments = this.studentsService.getStudentAssignments(id);
        
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
        } catch (error) {
            next(error)
        }
    }

    async getStudentGrades(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
            }
            
            const studentGrades = this.studentsService.getStudentAssignments(id);
        
            res.status(200).json({ error: undefined, data: parseForResponse(studentGrades), success: true });
        } catch (error) {
            next(error)
        }
    }
}