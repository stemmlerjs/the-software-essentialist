

import { PostsController } from "../../modules/posts/postController";
import { UserController } from "../../modules/users/userController";
import { WebServer } from "../http/webServer";

export class CompositionRoot {

  private createControllers () {
    const userController = new UserController();
    const postController = new PostsController();
    return {
      userController, 
      postController
    }
  }

  getWebServer () {
    const controller = this.createControllers();
    return new WebServer({ port: 3000 }, controller)
  }
}