import express from "express";
import { GetPostsQuery } from "./postsQuery";
import { CreatePostResponse, GetPostsResponse } from "@dddforum/shared/src/api/posts";
import { PostsService } from "./postsService";
import { ErrorHandler } from "../../shared/errors";
import { CreatePostCommand } from "./postsCommands";
import { DatabaseError } from "../../shared/exceptions";
import { Post } from "./domain/writeModels/post";

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
    this.router.post("/new", this.createPost.bind(this));
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
        data: posts.map((p) => p.toDTO()),
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  private async createPost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const command = CreatePostCommand.fromRequest(req.body);
      const postOrError = await this.postsService.createPost(command);
      
      if (postOrError instanceof Post) { 
        const response: CreatePostResponse = {
          success: true,
          data: undefined
        };
        return res.status(200).json(response);
      } else  {
        next(postOrError);
      }
    } catch (error) {
      next(error);
    }
  }
}
