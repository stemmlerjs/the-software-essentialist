import express from "express";
import { UsersService } from "./usersService";
import { parseUserForResponse } from "../../shared/utils/parser";
import { CreateUserCommand } from "./usersCommand";
import { ErrorHandler } from "../../shared/errors";

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
  }

  private setupErrorHandler() {
    this.router.use(this.errorHandler);
  }

  private async createUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const command = CreateUserCommand.fromRequest(req.body);
      const user = await this.usersService.createUser(command);
      return res.status(201).json({
        error: undefined,
        data: parseUserForResponse(user),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}
