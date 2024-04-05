import express from "express";
import cors from "cors";
import { Server } from "http";
import { PostsController } from "../../modules/posts/postController";
import { UserController } from "../../modules/users/userController";
import { MarketingController } from "../../modules/marketing/marketingController";
import { ProcessService } from "../processes/processService";

interface Controllers {
  userController: UserController;
  postController: PostsController;
  marketingController: MarketingController;
}

interface WebServerConfig {
  port: number;
}

export class WebServer {
  private state: "stopped" | "started";
  private express: express.Express;
  private instance: Server | undefined;
  private config: WebServerConfig;

  constructor(config: WebServerConfig, controllers: Controllers) {
    this.config = config;
    this.state = "stopped";
    this.express = express();
    this.initializeServer();
    this.setupRoutes(controllers);
  }

  private initializeServer() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private setupRoutes(controllers: Controllers) {
    const { userController, postController, marketingController } = controllers;
    // Create a new user
    this.express.post("/users/new", (req, res) =>
      userController.createUser(req, res)
    );

    // Edit a user
    this.express.post("/users/edit/:userId", (req, res) =>
      userController.editUser(req, res)
    );

    // Get a user by email
    this.express.get("/users", (req, res) =>
      userController.getUserByEmail(req, res)
    );

    // Get posts
    this.express.get("/posts", (req, res) => postController.getPosts(req, res));

    // Add person to list
    this.express.post("/marketing/new", (req, res) =>
      marketingController.addToList(req, res)
    );
  }

  async start(): Promise<void> {
    return new Promise((resolve, _reject) => {
      ProcessService.killProcessOnPort(this.config.port, () => {
        console.log("Starting the server");
        this.instance = this.express.listen(this.config.port, () => {
          console.log(`Server is running on port ${this.config.port}`);
          this.state = "started";
          resolve();
        });
      });
    });
  }

  async stop() {
    return new Promise((resolve, reject) => {
      if (!this.instance) return reject("Server not started");
      this.instance.close((err) => {
        if (err) return reject("Error stopping the server");
        this.state = 'stopped';
        return resolve("Server stopped");
      });
    });
  }

  isStarted() {
    return this.state === "started";
  }
}
