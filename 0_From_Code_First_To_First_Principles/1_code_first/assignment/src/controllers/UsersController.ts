import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../prisma/client';

class UsersController {
    static async create(req: Request, res: Response) {
        const { email, password, firstName, lastName } = req.body;
        console.log({ req });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {
            const user = await prisma.user.create({
                data: {
                    email,
                    password,
                    firstName,
                    lastName,
                },
            });

            return res.status(201).json({ user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }

    static async edit(req: Request, res: Response) {
        const { userId } = req.params;
        const { email, password, firstName, lastName } = req.body;

        try {
            const user = await prisma.user.update({
                where: { id: parseInt(userId) },
                data: {
                    email,
                    password,
                    firstName,
                    lastName,
                },
            });

            return res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }

    static async getByEmail(req: Request, res: Response) {
        const { email } = req.query as { email: string };

        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
}

export default UsersController;