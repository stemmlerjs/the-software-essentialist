
import { UsersService } from "./application/usersService";
import { ApplicationModule } from "../../shared/modules/applicationModule";
import { Config } from "../../shared/config";
import { IdentityServiceAPI } from "./externalServices/ports/identityServiceAPI";
import { Auth0 } from "./externalServices/adapters/auth0";

export class UsersModule extends ApplicationModule {
  private usersService: UsersService;
  private identityServiceAPI: IdentityServiceAPI;

  private constructor(
    config: Config,
  ) {
    super(config);
    this.usersService = this.createUsersService();
    this.identityServiceAPI = this.createIdentityServiceAPI();
  }

  private createIdentityServiceAPI () {
    return new Auth0();
  }

  static build(config: Config) {
    return new UsersModule(config);
  }

  private createUsersService() {
    return new UsersService(this.identityServiceAPI);
  }

  public getUsersService() {
    return this.usersService;
  }
}
