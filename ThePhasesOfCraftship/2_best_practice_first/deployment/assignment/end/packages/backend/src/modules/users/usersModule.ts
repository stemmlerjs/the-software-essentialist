import { UsersController } from "./usersController";
import { WebServer } from "../../shared/http/webServer";
import { UsersService } from "./usersService";
import { userErrorHandler } from "./usersErrors";
import { ApplicationModule } from "../../shared/modules/applicationModule";
import { Config } from "../../shared/config";
import { TransactionalEmailAPI } from "../notifications/ports/transactionalEmailAPI";
import { UsersRepository } from "./ports/usersRepository";
import { InMemoryUserRepositorySpy } from "./adapters/inMemoryUserRepositorySpy";
import { ProductionUserRepository } from "./adapters/productionUserRepository";
import { Database } from "../../shared/database";

export class UsersModule extends ApplicationModule {
  private usersService: UsersService;
  private usersController: UsersController;
  private usersRepository: UsersRepository;

  private constructor(
    private db: Database,
    private emailAPI: TransactionalEmailAPI,
    config: Config,
  ) {
    super(config);
    this.usersRepository = this.createUsersRepository();
    this.usersService = this.createUsersService();
    this.usersController = this.createUsersController();
  }

  static build(db: Database, emailAPI: TransactionalEmailAPI, config: Config) {
    return new UsersModule(db, emailAPI, config);
  }

  private createUsersRepository() {
    if (this.usersRepository) return this.usersRepository;
    if (this.shouldBuildFakeRepository) {
      return new InMemoryUserRepositorySpy();
    }

    return new ProductionUserRepository(this.db.getConnection());
  }

  private createUsersService() {
    return new UsersService(this.usersRepository, this.emailAPI);
  }

  private createUsersController() {
    return new UsersController(this.usersService, userErrorHandler);
  }

  public getController() {
    return this.usersController;
  }

  public mountRouter(webServer: WebServer) {
    webServer.mountRouter("/users", this.usersController.getRouter());
  }

  public getUsersService() {
    return this.usersService;
  }

  public getUsersRepository() {
    return this.usersRepository;
  }
}
