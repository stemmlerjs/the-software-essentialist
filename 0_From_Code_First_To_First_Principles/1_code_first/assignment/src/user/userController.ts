import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserController {
	static async newUser(req: Request, res: Response) {
		let { name, email, password } = req.body;
		try {
			let user = await prisma.user.create({
				data: { name, email, password },
			});
			res.json(user);
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: "Error creating user" });
		}
	}

	static async editUser(req: Request, res: Response) {
		let { userId } = req.params;
		let { name, email, password } = req.body;
		try {
			let user = await prisma.user.update({
				where: { id: Number(userId) },
				data: { name, email, password },
			});
			res.json(user);
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: "Error updating user" });
		}
	}

	static async getUserByEmail(req: Request, res: Response) {
		let { email } = req.query;

		try {
			let user = await prisma.user.findUnique({
				where: { email: String(email) },
			});

			if (user) {
				res.json(user);
			} else {
				res.status(404).json({ error: "User not found" });
			}
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: "Error getting user" });
		}
	}
}
