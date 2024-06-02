import { UsersController, UsersService } from "../../modules";
import { Config } from "../config";
import { Database } from "../database";
import { WebServer } from "../http/webServer";
import { ErrorHandler, errorHandler } from "../errors";

export class CompositionRoot {
  private webServer: WebServer;
  private dbConnection: Database;
  private errorHandler: ErrorHandler;
  private usersService: UsersService;
  private config: Config;
  private static instance: CompositionRoot | null = null;

  public static createCompositionRoot(config: Config) {
    if (!CompositionRoot.instance) {
      CompositionRoot.instance = new this(config);
    }
    return CompositionRoot.instance;
  }

  private constructor(config: Config) {
    this.config = config;
    this.errorHandler = errorHandler;
    this.dbConnection = this.createDBConnection();
    this.usersService = this.createUserService();
    this.webServer = this.createWebServer();
  }

  private getUsersService() {
    return this.usersService;
  }

  private getErrorHandler() {
    return this.errorHandler;
  }

  private createUserService() {
    const dbConnection = this.getDBConnection();
    return new UsersService(dbConnection);
  }

  private createControllers() {
    const usersService = this.getUsersService();
    const errorHandler = this.getErrorHandler();
    const usersController = new UsersController(usersService, errorHandler);

    return {
      usersController,
    };
  }

  private createDBConnection() {
    const dbConnection = new Database();
    if (!this.dbConnection) {
      this.dbConnection = dbConnection;
    }
    return dbConnection;
  }

  getDBConnection() {
    if (!this.dbConnection) this.createDBConnection();
    return this.dbConnection;
  }

  createWebServer() {
    const controllers = this.createControllers();
    return new WebServer({ port: 3000, env: this.config.env }, controllers);
  }

  getWebServer() {
    return this.webServer;
  }
}
