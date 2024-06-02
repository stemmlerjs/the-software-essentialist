import { UsersController, UsersService } from "../../modules";
import { TransactionalEmailAPI } from "../../modules/marketing/transactionalEmailAPI";
import { MarketingController } from "../../modules/marketing/marketingController";
import {
  MarketingErrorHandler,
  marketingErrorHandler,
} from "../../modules/marketing/marketingErrors";
import { MarketingService } from "../../modules/marketing/marketingService";
import { UserErrorHandler, userErrorHandler } from "../../modules/users";
import { Config } from "../config";
import { Database } from "../database";
import { WebServer } from "../http/webServer";
import { ContactListAPI } from "../../modules/marketing/contactListAPI";

type ErrorHandlers = {
  usersErrorHandler: UserErrorHandler;
  marketingErrorHandler: MarketingErrorHandler;
};

export class CompositionRoot {
  private webServer: WebServer;
  private dbConnection: Database;
  private errorHandlers: ErrorHandlers;
  private usersService: UsersService;
  private config: Config;
  private transactionalEmailAPI: TransactionalEmailAPI;
  private static instance: CompositionRoot | null = null;

  public static createCompositionRoot(config: Config) {
    if (!CompositionRoot.instance) {
      CompositionRoot.instance = new this(config);
    }
    return CompositionRoot.instance;
  }

  private constructor(config: Config) {
    this.config = config;
    this.errorHandlers = {
      usersErrorHandler: userErrorHandler,
      marketingErrorHandler: marketingErrorHandler,
    };
    this.dbConnection = this.createDBConnection();
    this.transactionalEmailAPI = this.createTransactionalEmailAPI();
    this.usersService = this.createUserService();
    this.webServer = this.createWebServer();
  }

  private getUsersService() {
    return this.usersService;
  }

  private getUserErrorHandler() {
    return this.errorHandlers.usersErrorHandler;
  }

  private createUserService() {
    const dbConnection = this.getDBConnection();
    return new UsersService(dbConnection, this.transactionalEmailAPI);
  }

  private createTransactionalEmailAPI() {
    return new TransactionalEmailAPI();
  }

  private createControllers() {
    const usersController = this.createUsersController();
    const marketingController = this.createMarketingController();

    return {
      usersController,
      marketingController,
    };
  }

  private createUsersController() {
    const usersService = this.getUsersService();
    const errorHandler = this.getUserErrorHandler();
    return new UsersController(usersService, errorHandler);
  }

  private createMarketingController() {
    const marketingService = this.createMarketingService();
    const errorHandler = this.getMarketingErrorHandler();
    return new MarketingController(marketingService, errorHandler);
  }

  private getMarketingErrorHandler() {
    return this.errorHandlers.marketingErrorHandler;
  }

  private createMarketingService() {
    const contactListAPI = this.createContactListAPI();
    return new MarketingService(contactListAPI);
  }

  private createContactListAPI() {
    return new ContactListAPI();
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

  public getEnvironment() {
    return this.config.env;
  }
}
