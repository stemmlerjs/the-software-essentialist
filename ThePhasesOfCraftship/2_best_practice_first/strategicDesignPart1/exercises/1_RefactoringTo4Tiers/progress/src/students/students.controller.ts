import express from 'express';

import { isMissingKeys, isUUID, parseForResponse } from '../shared/utils';
import { prisma } from '../shared/database';
import { ErrorHandler, ErrorExceptionType } from '../shared/errors';

export class StudentsController {
	router: express.Router
    errorHandler: ErrorHandler

	constructor(errorHandler: ErrorHandler) {
		this.router = express.Router();
        this.errorHandler = errorHandler
		
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
        
            const cls = await prisma.class.create({
                data: {
                    name
                }
            });
        
            res.status(201).json({ error: undefined, data: parseForResponse(cls), success: true });
        } catch (error) {
            res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
        }
	}

    async getStudents(req: express.Request, res: express.Response, next: express.NextFunction) {
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
            res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
        }
    }

    async getStudent(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
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
                return res.status(404).json({ error: ErrorExceptionType.StudentNotFound, data: undefined, success: false });
            }
        
            res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
        }
    }

    async getStudentAssignments(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
            }
    
            // check if student exists
            const student = await prisma.student.findUnique({
                where: {
                    id
                }
            });
    
            if (!student) {
                return res.status(404).json({ error: ErrorExceptionType.StudentNotFound, data: undefined, success: false });
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
            res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
        }
    }

    async getStudentGrades(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
            }
    
            // check if student exists
            const student = await prisma.student.findUnique({
                where: {
                    id
                }
            });
    
            if (!student) {
                return res.status(404).json({ error: ErrorExceptionType.StudentNotFound, data: undefined, success: false });
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
            res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
        }
    }
}