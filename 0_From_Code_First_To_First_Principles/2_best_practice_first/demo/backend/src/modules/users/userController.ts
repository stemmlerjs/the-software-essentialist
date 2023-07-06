
import { Request, Response } from "express";
import { UserService } from "./userService";

export class UserController {

  constructor (private userService: UserService) {}

  async createUser (req: Request, res: Response) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user.' });
    }
  }

  async editUserByIdController (req: Request, res: Response) {
    try {
      const user = await this.userService.editUser(Number(req.params.userId), req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to edit user.' });
    }
  }

  async getUserByEmailController (req: Request, res: Response) {
    try {
      const email = req.query.email as string;
      const user = await this.userService.getUserByEmail(email);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user.' });
    }
  }
}

