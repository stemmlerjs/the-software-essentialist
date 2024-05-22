import express from "express";
import { CreateUserCommand } from "./usersCommand";
import { ErrorHandler, Errors } from "../../shared/errors";
import { EditUserCommand } from "@dddforum/shared/src/api/users";

export class UsersController {
  private router: express.Router;

  constructor(
    private usersService: UsersService,
    private errorHandler: ErrorHandler,
  ) {
    this.router = express.Router();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  getRouter() {
    return this.router;
  }

  private setupRoutes() {
    this.router.post("/users/new", this.createUser.bind(this));
    this.router.post("/users", this.getUser.bind(this));
  }

  private setupErrorHandler() {
    this.router.use(this.errorHandler);
  }

  async createUser (req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const command = CreateUserCommand.fromRequest(req.body);
      const result = await this.usersService.createUser(command);
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
    catch (error) {
      next(error);
    }
  }

  async editUser (req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const command: EditUserCommand = {
        ...req.body,
        id: Number(req.params.userId)
      };
      const result = await this.usersService.editUser(command);
  
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
    } catch (error) {
      next(error);
    }
    
  }

  async getUser (req: express.Request, res: express.Response, next: express.NextFunction)  {
    const query: GetUserByEmailQuery = {
      email: req.query.email as string
    };

    const result = await this.application.user.getUserByEmail(query);

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


// import express from 'express';
// import { Errors } from '../../shared/errors/errors';
// import { CreateUserCommand, EditUserCommand, GetUserByEmailQuery } from '@dddforum/shared/src/api/users'
// import { Application } from '../../shared/application/applicationInterface'

// export class UserController {
//   constructor (private application: Application) {
    
//   }


// }

