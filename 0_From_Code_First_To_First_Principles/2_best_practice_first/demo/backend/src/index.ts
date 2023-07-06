
import { UserController } from "./modules/users/userController";
import { UserService } from "./modules/users/userService";
import { WebServer } from "./shared/infra/http/webServer";

let userService = new UserService();
let userController = new UserController(userService)

// new WebServer({ port: 3000 }, userController).start();


