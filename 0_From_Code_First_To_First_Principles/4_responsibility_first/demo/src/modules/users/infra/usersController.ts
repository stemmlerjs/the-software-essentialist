import { Request, Response } from 'express';
import { ApplicationAPI } from '../../applicationAPI';
import { CreateUserInput } from '../application/usersAPI';

export class UsersController {
  
  constructor(private application: ApplicationAPI) {}

  async createUser(req: Request, res: Response) {
    const { email, firstName, lastName } = req.body;

    let createUserInput: CreateUserInput = { email, firstName, lastName };

    try {
      let response = await this.application.users.createUser(createUserInput)
      
      // if (response.isSuccess()) {
      //   return res.status(201).json({ message: 'Successfully created' });
      // }

      // switch (response.getError()) {
      //   case 'AlreadyCreatedError':
      //   case 'ValidationError':
      //   case 'Error'

      // }

    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
}
