import { Request, Response, NextFunction } from "express";
import { UserService } from "./userService";

export class UserController {
  private userService = new UserService();

	createUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = await this.userService.createUser(req.body);
			res.json(user);
		} catch (err) {
      next(err);
		}
	}

	editUser = async (req: Request, res: Response, next: NextFunction) => {
		const userId = parseInt(req.params.userId, 10);
		
		try {
			const user = await this.userService.editUser(userId, req.body);
			res.json(user);
		} catch (err) {
      next(err);
		}
	}

	getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.query.email as string;

		try {
			const user = await this.userService.getUserByEmail(email);
			res.json(user);
		} catch (err) {
      next(err);
		}
	}
}
