import express from 'express'

import { ErrorExceptionType, ErrorHandler } from '../shared/errors'
import { isMissingKeys, isUUID, parseForResponse } from '../shared/utils'
import { prisma } from '../shared/database'

export class ClassesController {
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
		this.router.post('/', this.createClass)
		this.router.get('/:id/assignments', this.getClassAssignments)
	}

	private setupErrorHandler() {
		this.router.use(this.errorHandler)
	}

	async createClass(req: express.Request, res: express.Response, next: express.NextFunction) {
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

	async getClassAssignments(req: express.Request, res: express.Response, next: express.NextFunction) {
		try {
			const { id } = req.params;
			
			if(!isUUID(id)) {
				return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
			}
	
			// check if class exists
			const cls = await prisma.class.findUnique({
				where: {
					id
				}
			});
	
			if (!cls) {
				return res.status(404).json({ error: ErrorExceptionType.ClassNotFound, data: undefined, success: false });
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
			res.status(500).json({ error: ErrorExceptionType.ServerError, data: undefined, success: false });
		}
	}
}