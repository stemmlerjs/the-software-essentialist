
import express from 'express';
import { Errors } from '../../shared/errors/errors';
import { UserService } from './usersService';
import { CreateUserCommand, EditUserCommand, GetUserByEmailQuery } from '@dddforum/shared/src/api/users'

export class UserController {
  constructor (private userService: UserService) {
    
  }

  async createUser (req: express.Request, res: express.Response) {
    const command: CreateUserCommand = req.body;
    const result = await this.userService.createUser(command);
    
    if (result.success) {
      return res.status(201).json(result);
    } else {
      switch (result.error) {
        case Errors.EmailAlreadyInUse:
        case Errors.UsernameAlreadyTaken:
          return res.status(409).json(result)
        case Errors.ValidationError:
        case Errors.ClientError:
          return res.status(400).json(result)
        case Errors.ServerError:
        default:
          return res.status(500).json(result);
      }
    }
  }

  async editUser (req: express.Request, res: express.Response) {
    const command: EditUserCommand = {
      ...req.body,
      id: Number(req.params.userId)
    };
    const result = await this.userService.editUser(command);

    if (result.success) {
      return res.status(200).json(result);
    } else {
      switch(result.error) {
        case Errors.EmailAlreadyInUse:
        case Errors.UsernameAlreadyTaken:
          return res.status(409).json(result)
        case Errors.ValidationError:
        case Errors.ClientError:
          return res.status(400).json(result)
        case Errors.ServerError:
        default:
          return res.status(500).json(result);
      }
    }
  }

  async getUserByEmail (req: express.Request, res: express.Response)  {
    const query: GetUserByEmailQuery = {
      email: req.query.email as string
    };

    const result = await this.userService.getUserByEmail(query);

    if (result.success) {
      return res.status(200).json(result);
    } else {
      switch(result.error) {
        case Errors.UserNotFound:
          return res.status(404).json(result)
        case Errors.UsernameAlreadyTaken:
          return res.status(409).json(result)
        case Errors.ValidationError:
        case Errors.ClientError:
          return res.status(400).json(result)
        case Errors.ServerError:
        default:
          return res.status(500).json(result);
      }
    }
  }
}

