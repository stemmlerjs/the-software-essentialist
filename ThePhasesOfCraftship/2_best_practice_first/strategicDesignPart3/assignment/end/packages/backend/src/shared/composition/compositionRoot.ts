import { Config } from "../config";
import { Database } from "../database";
import { WebServer } from "../http/webServer";
import {
  UsersModule,
  PostsModule,
  NotificationsModule,
  MarketingModule,
} from "@dddforum/backend/src/modules";

export class CompositionRoot {
  private static instance: CompositionRoot | null = null;

  private webServer: WebServer;
  private dbConnection: Database;
  private config: Config;

  private usersModule: UsersModule;
  private marketingModule: MarketingModule;
  private postsModule: PostsModule;
  private notificationsModule: NotificationsModule;

  public static createCompositionRoot(config: Config) {
    if (!CompositionRoot.instance) {
      CompositionRoot.instance = new this(config);
    }
    return CompositionRoot.instance;
  }

  private constructor(config: Config) {
    this.config = config;
    this.dbConnection = this.createDBConnection();
    this.notificationsModule = NotificationsModule.build();
    this.marketingModule = MarketingModule.build();
    this.usersModule = UsersModule.build(
      this.dbConnection,
      this.notificationsModule.getTransactionalEmailAPI(),
    );
    this.postsModule = PostsModule.build(this.dbConnection);
    this.webServer = this.createWebServer();
    this.mountRoutes();
  }

  getDBConnection() {
    if (!this.dbConnection) this.createDBConnection();
    return this.dbConnection;
  }

  createWebServer() {
    return new WebServer({ port: 3000, env: this.config.env });
  }

  getWebServer() {
    return this.webServer;
  }

  private mountRoutes() {
    this.marketingModule.mountRoutes(this.webServer);
    this.usersModule.mountRoutes(this.webServer);
    this.postsModule.mountRoutes(this.webServer);
  }

  private createDBConnection() {
    const dbConnection = new Database();
    if (!this.dbConnection) {
      this.dbConnection = dbConnection;
    }
    return dbConnection;
  }
}
