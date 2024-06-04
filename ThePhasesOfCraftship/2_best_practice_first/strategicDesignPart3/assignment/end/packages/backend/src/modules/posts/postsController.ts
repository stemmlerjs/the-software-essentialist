import express from "express";
import { GetPostsQuery } from "./postsQuery";
import { GetPostsResponse } from "@dddforum/shared/src/api/posts";
import { PostsService } from "./postsService";
import { ErrorHandler } from "../../shared/errors";

export class PostsController {
  private router: express.Router;

  constructor(
    private postsService: PostsService,
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
    this.router.get("/", this.getPosts.bind(this));
  }

  private setupErrorHandler() {
    this.router.use(this.errorHandler);
  }

  private async getPosts(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const query = GetPostsQuery.fromRequest(req.query);
      const posts = await this.postsService.getPosts(query);
      const response: GetPostsResponse = {
        success: true,
        data: posts,
        error: {},
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
