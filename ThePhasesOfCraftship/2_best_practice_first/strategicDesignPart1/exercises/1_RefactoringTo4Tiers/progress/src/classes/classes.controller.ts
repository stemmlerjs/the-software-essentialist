import express from 'express'

import { ErrorExceptionType, ErrorHandler } from '../shared/errors'
import { isMissingKeys, isUUID, parseForResponse } from '../shared/utils'
import { ClassesService } from './classes.service'

export class ClassesController {
	router: express.Router
	errorHandler: ErrorHandler
	classesService: ClassesService

	constructor(errorHandler: ErrorHandler, classesService: ClassesService) {
		this.router = express.Router()
		this.errorHandler = errorHandler
		this.classesService = classesService

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
		
			const cls = await this.classesService.createClass(name);
		
			res.status(201).json({ error: undefined, data: parseForResponse(cls), success: true });
		} catch (error) {
			next(error)
		}
	}

	async getClassAssignments(req: express.Request, res: express.Response, next: express.NextFunction) {
		try {
			const { id } = req.params;
			
			if(!isUUID(id)) {
				return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
			}
	
			const assignments = await this.classesService.getClassAssignments(id);

			res.status(200).json({ error: undefined, data: parseForResponse(assignments), success: true });
		} catch (error) {
			next(error)
		}
	}
}