import { UsersController, UsersService } from "../../modules";
import { Environment } from "../config";
import { Database } from "../database";
import { WebServer } from "../http/webServer";
import { ErrorHandler } from "../errors";

export class CompositionRoot {
  private webServer: WebServer;
  private dbConnection: Database;
  private context: Environment;
  private errorHandler: ErrorHandler;
  private usersService: UsersService;
  private static instance: CompositionRoot | null = null;

  public static createCompositionRoot(
    context: Environment,
    errorHandler: ErrorHandler,
  ) {
    if (!CompositionRoot.instance) {
      CompositionRoot.instance = new this(context, errorHandler);
    }
    return CompositionRoot.instance;
  }

  private constructor(context: Environment, errorHandler: ErrorHandler) {
    this.context = context;
    this.errorHandler = errorHandler;
    this.dbConnection = this.createDBConnection();
    this.usersService = this.createUserService();
    this.webServer = this.createWebServer();
  }

  public getContext() {
    return this.context;
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
    return new WebServer({ port: 3000, env: this.context }, controllers);
  }

  getWebServer() {
    return this.webServer;
  }
}
