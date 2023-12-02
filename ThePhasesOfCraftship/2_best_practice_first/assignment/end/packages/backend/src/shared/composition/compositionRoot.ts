
import { PostsController } from "../../modules/posts/postController";
import { UserController } from "../../modules/users/userController";
import { WebServer } from "../http/webServer";
import { PrismaClient } from '@prisma/client';

export class CompositionRoot {

  private webServer: WebServer;
  private prisma: PrismaClient;

  constructor () {
    this.prisma = this.createPrisma();
    this.webServer = this.createWebServer();
  }

  private createControllers () {
    const prisma = this.getPrisma();
    const userController = new UserController(prisma);
    const postController = new PostsController(prisma);

    return {
      userController, 
      postController
    }
  }

  private createPrisma () {
    return new PrismaClient()
  }

  getPrisma () {
    return this.prisma;
  }

  createWebServer () {
    const controller = this.createControllers();
    return new WebServer({ port: 3000 }, controller)
  }

  getWebServer () {
    return this.webServer;
    
  }
}