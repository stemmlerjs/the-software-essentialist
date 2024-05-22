import { UsersController, UsersService } from "../../modules";
import { Environment } from "../config";
import { Database } from "../database";
import { WebServer } from "../http/webServer";
import { ErrorHandler, errorHandler } from "../errors";

export class CompositionRoot {
  private webServer: WebServer;
  private dbConnection: Database;
  private environment: Environment;
  private errorHandler: ErrorHandler;
  private usersService: UsersService;
  private static instance: CompositionRoot | null = null;

  public static createCompositionRoot(
    environment: Environment
  ) {
    if (!CompositionRoot.instance) {
      CompositionRoot.instance = new this(environment);
    }
    return CompositionRoot.instance;
  }

  private constructor(environment: Environment) {
    this.environment = environment;
    this.errorHandler = this.createErrorHandler();
    this.dbConnection = this.createDBConnection();
    this.usersService = this.createUserService();
    this.webServer = this.createWebServer();
  }

  private createErrorHandler () {
    return errorHandler;
  }

  public getenvironment() {
    return this.environment;
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
    return new WebServer({ port: 3000, env: this.environment }, controllers);
  }

  getWebServer() {
    return this.webServer;
  }
}
