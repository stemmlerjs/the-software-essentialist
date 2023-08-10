import { Request, Response, NextFunction } from "express";
import { UserService } from "./userService";

export class UserController {
	static async createUser(req: Request, res: Response, next: NextFunction) {
		const userService = new UserService();

		try {
			const user = await userService.createUser(req.body);
			res.json(user);
		} catch (err) {
      next(err);
		}
	}

	static async editUser(req: Request, res: Response, next: NextFunction) {
		const userService = new UserService();
		const userId = parseInt(req.params.userId, 10);
		
		try {
			const user = await userService.editUser(userId, req.body);
			res.json(user);
		} catch (err) {
      next(err);
		}
	}

	static async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    const userService = new UserService();
    const email = req.query.email as string;

		try {
			const user = await userService.getUserByEmail(email);
			res.json(user);
		} catch (err) {
      next(err);
		}
	}
}
