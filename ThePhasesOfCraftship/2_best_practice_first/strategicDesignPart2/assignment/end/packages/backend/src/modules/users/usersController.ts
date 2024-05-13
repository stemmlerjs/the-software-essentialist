import express from "express";
import { UsersService } from "./usersService";
import { prisma } from "../../shared/database";
import { isMissingKeys, parseUserForResponse } from "../../shared/utils/parser";
import { CreateUserDTO } from "./usersDTO";
import { ErrorHandler, Errors } from "../../shared/errors";

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
    this.router.post("/users/edit/:id", this.editUsers.bind(this));
    this.router.get("/users/:id", this.getUser.bind(this));
    this.router.get("/posts/:id", this.getPosts.bind(this));
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
      const dto = CreateUserDTO.fromRequest(req.body);
      const user = await this.usersService.createUser(dto);
      return res.status(201).json({
        error: undefined,
        data: parseUserForResponse(user),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  private async editUsers(req: express.Request, res: express.Response) {
    try {
      const id = Number(req.params.userId);

      const keyIsMissing = isMissingKeys(req.body, [
        "email",
        "firstName",
        "lastName",
        "username",
      ]);

      if (keyIsMissing) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      // Get user by id
      const userToUpdate = await prisma.user.findFirst({ where: { id } });
      if (!userToUpdate) {
        return res.status(404).json({
          error: Errors.UserNotFound,
          data: undefined,
          success: false,
        });
      }

      // If target username already taken by another user
      const existingUserByUsername = await prisma.user.findFirst({
        where: { username: userToUpdate.username },
      });
      if (
        existingUserByUsername &&
        userToUpdate.id !== existingUserByUsername.id
      ) {
        return res.status(409).json({
          error: Errors.UsernameAlreadyTaken,
          data: undefined,
          success: false,
        });
      }

      // If target email already exists from another user
      const existingUserByEmail = await prisma.user.findFirst({
        where: { email: userToUpdate.email },
      });
      if (existingUserByEmail && userToUpdate.id !== existingUserByEmail?.id) {
        return res.status(409).json({
          error: Errors.EmailAlreadyInUse,
          data: undefined,
          success: false,
        });
      }

      const userData = req.body;
      const user = await prisma.user.update({ where: { id }, data: userData });
      return res.status(200).json({
        error: undefined,
        data: parseUserForResponse(user),
        success: true,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }

  private async getUser(req: express.Request, res: express.Response) {
    try {
      const email = req.query.email as string;
      if (email === undefined) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(404).json({
          error: Errors.UserNotFound,
          data: undefined,
          success: false,
        });
      }

      return res.status(200).json({
        error: undefined,
        data: parseUserForResponse(user),
        succes: true,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }

  private async getPosts(req: express.Request, res: express.Response) {
    try {
      const { sort } = req.query;

      if (sort !== "recent") {
        return res
          .status(400)
          .json({ error: Errors.ClientError, data: undefined, success: false });
      }

      const postsWithVotes = await prisma.post.findMany({
        include: {
          votes: true, // Include associated votes for each post
          memberPostedBy: {
            include: {
              user: true,
            },
          },
          comments: true,
        },
        orderBy: {
          dateCreated: "desc", // Sorts by dateCreated in descending order
        },
      });

      return res.json({
        error: undefined,
        data: { posts: postsWithVotes },
        success: true,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }
}
