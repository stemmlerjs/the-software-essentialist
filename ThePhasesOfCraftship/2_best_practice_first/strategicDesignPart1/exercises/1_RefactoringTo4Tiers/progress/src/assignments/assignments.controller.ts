import express from 'express';
import { ErrorExceptionType, ErrorHandler } from '../shared/errors';
import { isMissingKeys, isUUID, parseForResponse } from '../shared/utils';
import { AssignmentsService } from './asssignments.service';

export class AssignmentsController {
	router: express.Router
	errorHandler: ErrorHandler
	assignmentsService: AssignmentsService

	constructor(errorHandler: ErrorHandler, assignmentsService: AssignmentsService) {
		this.router = express.Router()
		this.errorHandler = errorHandler
		this.assignmentsService = assignmentsService

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
		
			const assignment = await this.assignmentsService.createAssignment(classId, title);
		
			res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
		} catch (error) {
			next(error)
		}
	}

	async getAssignment(req: express.Request, res: express.Response, next: express.NextFunction) {
		try {
			const { id } = req.params;
			
			if(!isUUID(id)) {
				return res.status(400).json({ error: ErrorExceptionType.ValidationError, data: undefined, success: false });
			}
			
			const assignment = await this.assignmentsService.getAssignment(id);
		
			res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
		} catch (error) {
			next(error)
		}
	}
}