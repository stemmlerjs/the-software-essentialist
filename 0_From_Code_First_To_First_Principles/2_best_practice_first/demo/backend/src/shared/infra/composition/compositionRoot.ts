
import { UserController } from "../../../modules/users/userController";
import { UserService } from "../../../modules/users/userService";
import { WebServer } from "../http/webServer";

export class CompositionRoot {

  private webServer: WebServer;
  private userController: UserController;
  private userService: UserService;

  constructor () {
    this.userService = this.createUserService();
    this.userController = this.createUserController();
    this.webServer = this.createWebServer();
  }

  createUserService () {
    return new UserService();
  }

  getUserService () {
    return this.userService
  }

  createUserController () {
    let userService = this.getUserService();
    return new UserController(userService)
  }

  getUserController () {
    return this.userController
  }

  createWebServer () {
    let userController = this.getUserController();
    return new WebServer({ port: 3000 }, userController)
  }

  getWebServer () {
    return this.webServer
  }
}