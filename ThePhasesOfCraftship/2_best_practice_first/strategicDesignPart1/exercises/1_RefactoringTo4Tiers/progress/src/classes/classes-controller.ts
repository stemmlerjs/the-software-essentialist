import express, { Request, Response, NextFunction} from 'express'

import { prisma } from '../database';
import { InvalidIdentifierException, InvalidRequestBodyException } from '../shared/errors/exceptions';

import { errorHandler } from './error-handler';
import { ClassNotFoundException } from './exceptions';
import { ClassesService } from './classes.service';

export class ClassesController {
	router: express.Router
	classesService: ClassesService

	constructor(classesService: ClassesService) {
		this.router = express.Router();
		this.classesService = classesService;
		this.setupRoutes();
		this.setupErrorHandler();
	}

	getRouter() {
		return this.router;
	}

	private setupRoutes() {
		this.router.post('/classes', this.createClass);
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
		
			const cls = await this.classesService.createClass(name);
		
			res.status(201).json({ error: undefined, data: parseForResponse(cls), success: true });
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