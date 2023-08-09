import { Request, Response } from "express";
import { UserService } from "./userService";

export class UserController {
	static async createUser(req: Request, res: Response) {
		const userService = new UserService();
		try {
			const user = await userService.createUser(req.body);
			res.json(user);
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: err });
		}
	}

	static async editUser(req: Request, res: Response) {
		const userService = new UserService();
		const userId = parseInt(req.params.userId, 10);
		try {
			const user = await userService.editUser(userId, req.body);
			res.json(user);
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: err });
		}
	}

	static async getUserByEmail(req: Request, res: Response) {
    const userService = new UserService();
    const email = req.query.email as string;
		try {
			const user = await userService.getUserByEmail(email);

			if (user) {
				res.json(user);
			} else {
				res.status(404).json({ error: "User not found" });
			}
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: err });
		}
	}
}