
import express from "express";
import { GetPostsQuery } from "./postsQuery";
import { CreatePostAPIResponse, GetPostsAPIResponse } from "@dddforum/shared/src/api/posts";
import { ErrorHandler } from "../../shared/errors";
import { CreatePostCommand } from "./postsCommands";
import { Post } from "./domain/post";
import { PostsService } from "./application/postsService";

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
      
      const response: GetPostsAPIResponse = {
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
      const result = await this.postsService.createPost(command);

      if (!result.isSuccess()) {
        const error = result.getError();
        return next(error);
      } else {
        const newPost = result.getValue() as Post;
        const postDetails = await this.postsService.getPostDetailsById(newPost.id);

        if (!postDetails) {
          return res.status(500).json("Server error: post created but could not be retrieved.");
        }

        const response: CreatePostAPIResponse = {
          success: true,
          data: postDetails?.toDTO()
        };
        return res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  }
}
