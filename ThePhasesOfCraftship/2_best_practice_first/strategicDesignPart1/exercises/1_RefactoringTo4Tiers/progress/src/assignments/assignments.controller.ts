import express from 'express';
import { ErrorExceptionType, ErrorHandler } from '../shared/errors';
import { isMissingKeys, isUUID, parseForResponse } from '../shared/utils';
import { prisma } from '../shared/database';

export class AssignmentsController {
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
		this.router.post('/', this.createAssignment)
		this.router.get('/:id', this.getAssignment)
	}

	private setupErrorHandler() {
		this.router.use(this.errorHandler)
	}

	async createAssignment(req: express.Request, res: express.Response, next: express.NextFunction) {
		try {
			if (isMissingKeys(req.body, ['classId', 'title'])) {
				return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
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
			res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
		}
	}

	async getAssignment(req: express.Request, res: express.Response, next: express.NextFunction) {
		try {
			const { id } = req.params;
			if(!isUUID(id)) {
				return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
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
				return res.status(404).json({ error: ErrorExceptionType.AssignmentNotFound, data: undefined, success: false });
			}
		
			res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
		} catch (error) {
			res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
		}
	}
}