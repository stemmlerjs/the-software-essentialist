import { UserIdentityService } from "./application/userIdentityService";
import { ApplicationModule } from "../../shared/modules/applicationModule";
import { IdentityServiceAPI } from "./externalServices/ports/identityServiceAPI";

import { WebServer } from "../../shared/http/webServer";
import { UsersController } from "./usersController";
import { userErrorHandler } from "./usersErrors"; // You'll need to create this
import { FirebaseAuth } from "./externalServices/adapters/firebaseAuth";
import { Config } from "@dddforum/config";

export class UsersModule extends ApplicationModule {
  private usersService: UserIdentityService;
  private identityServiceAPI: IdentityServiceAPI;
  private usersController: UsersController;

  private constructor(
    config: Config,
  ) {
    super(config);
    // Build external services + repos, then services, then controllers
    this.identityServiceAPI = this.createIdentityServiceAPI(config);
    this.usersService = this.createUsersService();
    this.usersController = this.createUsersController(config);
  }

  private createIdentityServiceAPI(config: Config) {
    return new FirebaseAuth();
  }

  private createUsersService() {
    return new UserIdentityService(this.identityServiceAPI);
  }

  private createUsersController(config: Config) {
    return new UsersController(config, userErrorHandler);
  }

  static build(config: Config) {
    return new UsersModule(config);
  }

  public getUsersService() {
    return this.usersService;
  }

  public mountRouter(webServer: WebServer) {
    webServer.mountRouter("/users", this.usersController.getRouter());
  }
}
