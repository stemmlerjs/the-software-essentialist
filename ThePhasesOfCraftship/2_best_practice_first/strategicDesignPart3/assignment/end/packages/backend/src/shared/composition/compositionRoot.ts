import { UsersController, UsersService } from "../../modules";
import { TransactionalEmailAPI } from "../../modules/marketing/transactionalEmailAPI";
import { MarketingController } from "../../modules/marketing/marketingController";
import {
  marketingErrorHandler,
} from "../../modules/marketing/marketingErrors";
import { MarketingService } from "../../modules/marketing/marketingService";
import {  userErrorHandler } from "../../modules/users";
import { Config } from "../config";
import { Database } from "../database";
import { WebServer } from "../http/webServer";
import { ContactListAPI } from "../../modules/marketing/contactListAPI";
import { ErrorHandler } from "../errors";
import { postsErrorHandler } from "../../modules/posts/postsErrors";
import { PostsService } from "../../modules/posts/postsService";
import { PostsController } from "../../modules/posts/postsController";

type ErrorHandlers = {
  usersErrorHandler: ErrorHandler;
  marketingErrorHandler: ErrorHandler;
  postsErrorHandler: ErrorHandler;
};

export class CompositionRoot {
  private webServer: WebServer;
  private dbConnection: Database;
  private errorHandlers: ErrorHandlers;
  private usersService: UsersService;
  private marketingService: MarketingService;
  private postsService: PostsService;
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
      postsErrorHandler: postsErrorHandler,
    };
    this.dbConnection = this.createDBConnection();
    this.transactionalEmailAPI = this.createTransactionalEmailAPI();
    this.usersService = this.createUserService();
    this.marketingService = this.createMarketingService();
    this.postsService = this.createPostsService();
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

  private createPostsService() {
    return new PostsService(this.dbConnection);
  }

  private createTransactionalEmailAPI() {
    return new TransactionalEmailAPI();
  }

  private createControllers() {
    const usersController = this.createUsersController();
    const marketingController = this.createMarketingController();
    const postsController = this.createPostsController();

    return {
      usersController,
      marketingController,
      postsController,
    };
  }

  private createUsersController() {
    const usersService = this.getUsersService();
    const errorHandler = this.getUserErrorHandler();
    return new UsersController(usersService, errorHandler);
  }

  private createMarketingController() {
    const errorHandler = this.getMarketingErrorHandler();
    return new MarketingController(this.marketingService, errorHandler);
  }

  private createPostsController() {
    return new PostsController(this.postsService, this.errorHandlers.postsErrorHandler);
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
