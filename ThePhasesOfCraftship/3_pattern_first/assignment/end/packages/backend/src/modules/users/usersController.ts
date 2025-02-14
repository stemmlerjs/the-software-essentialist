import express from "express";
import { UsersService } from "./usersService";
import { CreateUserCommand } from "./usersCommand";
import {
  CreateUserResponse,
  GetUserByEmailResponse,
} from "@dddforum/shared/src/api/users";
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
    this.router.post("/new", this.createUser.bind(this));
    this.router.get("/:email", this.getUserByEmail.bind(this));
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
      await this.usersService.createUser(command);

      const userDTO = await this.usersService.getUserDetailsByEmail(command.email);

      const response: CreateUserResponse = {
        success: true,
        data: userDTO,
        error: {},
      };
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  private async getUserByEmail(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const email = req.params.email;

      await this.usersService.getUserDetailsByEmail(email);

      const userDTO = await this.usersService.getUserDetailsByEmail(email);

      const response: GetUserByEmailResponse = {
        success: true,
        data: userDTO,
        error: {},
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
