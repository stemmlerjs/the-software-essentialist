import { TransactionalEmailAPI } from "../../modules/marketing/transactionalEmailAPI";

import { Config } from "../config";
import { Database } from "../database";
import { WebServer } from "../http/webServer";
import { ContactListAPI } from "../../modules/marketing/contactListAPI";
import { UsersModule } from "../../modules/users";
import { MarketingModule } from "../../modules/marketing";
import { PostsModule } from "../../modules/posts/postsModule";



export class CompositionRoot {
  private webServer: WebServer;
  private dbConnection: Database;
  private config: Config;
  private transactionalEmailAPI: TransactionalEmailAPI;
  private static instance: CompositionRoot | null = null;

  private usersModule: UsersModule;
  private marketingModule: MarketingModule
  private postsModule: PostsModule

  public static createCompositionRoot(config: Config) {
    if (!CompositionRoot.instance) {
      CompositionRoot.instance = new this(config);
    }
    return CompositionRoot.instance;
  }

  private constructor(config: Config) {
    this.config = config;
    this.dbConnection = this.createDBConnection();
    this.transactionalEmailAPI = this.createTransactionalEmailAPI();
    this.marketingModule = MarketingModule.build(this.createContactListAPI());
    this.usersModule = UsersModule.build(this.dbConnection, this.transactionalEmailAPI);
    this.postsModule = PostsModule.build(this.dbConnection);
    this.webServer = this.createWebServer();
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

  private createTransactionalEmailAPI() {
    return new TransactionalEmailAPI();
  }

  private createControllers() {
    const usersController = this.usersModule.getUsersController();
    const marketingController = this.marketingModule.getMarketingController();
    const postsController = this.postsModule.getPostsController();

    return {
      usersController,
      marketingController,
      postsController,
    };
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


}
