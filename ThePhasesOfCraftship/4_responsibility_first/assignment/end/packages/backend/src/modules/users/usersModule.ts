import { UsersController } from "./usersController";
import { WebServer } from "../../shared/http/webServer";
import { UsersService } from "./usersService";
import { userErrorHandler } from "./usersErrors";
import { ApplicationModule } from "../../shared/modules/applicationModule";
import { Config } from "../../shared/config";
import { UsersRepository } from "./ports/usersRepository";
import { ProductionUserRepository } from "./adapters/productionUserRepository";
import { Database } from "../../shared/database";
import { MembersRepository } from "../members/repos/ports/membersRepository";
import { TransactionalEmailAPI } from "../notifications/externalServices/ports/transactionalEmailAPI";

export class UsersModule extends ApplicationModule {
  private usersService: UsersService;
  private usersController: UsersController;
  private usersRepository: UsersRepository;

  private constructor(
    private db: Database,
    private emailAPI: TransactionalEmailAPI,
    private membersRepository: MembersRepository,
    config: Config,
  ) {
    super(config);
    this.usersRepository = this.createUsersRepository();
    this.usersService = this.createUsersService(membersRepository);
    this.usersController = this.createUsersController();
  }

  static build(db: Database, emailAPI: TransactionalEmailAPI, membersRepository: MembersRepository, config: Config) {
    return new UsersModule(db, emailAPI, membersRepository, config);
  }

  private createUsersRepository() {
    return new ProductionUserRepository(this.db.getConnection());
  }

  private createUsersService(membersRepository: MembersRepository) {
    return new UsersService(this.usersRepository, membersRepository, this.emailAPI);
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
