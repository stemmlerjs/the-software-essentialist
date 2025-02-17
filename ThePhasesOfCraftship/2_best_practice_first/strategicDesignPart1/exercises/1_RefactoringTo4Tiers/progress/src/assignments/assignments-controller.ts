import express, { Request, Response, NextFunction } from 'express';

import {errorHandler} from './error-handler';
import { InvalidIdentifierException, InvalidRequestBodyException } from '../shared/errors/exceptions';
import { AssignmentsService } from './assignments.service';

export class AssignmentsController {
	router: express.Router
	assignmentsService: AssignmentsService
	
	constructor(assignmentsService: AssignmentsService) {
		this.router = express.Router();
		this.assignmentsService = assignmentsService;
		this.setupRoutes();
		this.setupErrorHandler();
	}

	getRouter() {
		return this.router;
	}

	private setupRoutes() {
		this.router.post('/', this.createAssignment);
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
		
			const assignment = await this.assignmentsService.createAssignment(classId, title);
		
			res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
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

			const assignment = await this.assignmentsService.getAssignment(id);
		
			res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
		} catch (error) {
			next(error)
		}
	}
}