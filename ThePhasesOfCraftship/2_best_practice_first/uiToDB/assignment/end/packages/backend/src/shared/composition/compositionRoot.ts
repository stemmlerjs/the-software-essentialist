
import { PrismaClient } from "@prisma/client";
import { TransactionalEmailAPISpy } from "../../modules/marketing/adapters/transactionalEmailAPI/transactionalEmailAPISpy";
import { MailjetTransactionalEmail } from "../../modules/marketing/adapters/transactionalEmailAPI/mailjetTransactionalEmailAPI";
import { MailchimpContactList } from "../../modules/marketing/adapters/contactListAPI/mailchimpContactList";
import { ContactListAPISpy } from "../../modules/marketing/adapters/contactListAPI/contactListSpy";
import { ProductionPostRepo } from "../../modules/posts/adapters/productionPostRepo";
import { PostService } from "../../modules/posts/postService";
import { ProductionUserRepo } from "../../modules/users/adapters/productionUserRepo";
import { UserService } from "../../modules/users/usersService";
import { Application } from "../application/applicationInterface";
import { Environment } from "../config";
import { Database } from "../database/database";
import { WebServer } from "../webAPI/webServer";
import { InMemoryUserRepo } from "../../modules/users/adapters/inMemoryUserRepo";
import { InMemoryPostRepo } from "../../modules/posts/adapters/inMemoryPostRepo";
import { ContactListAPI } from "../../modules/marketing/ports/contactListAPI";
import { TransactionEmailAPI } from "../../modules/marketing/ports/transactionalEmailAPI";
import { MarketingService } from "../../modules/marketing/marketingService";

export class CompositionRoot {
  private webServer: WebServer;
  private database: Database;
  private context: Environment;
  private transactionalEmailAPI: TransactionEmailAPI;
  private postService: PostService;
  private userService: UserService;
  private marketingService: MarketingService;
  private contactListAPI: ContactListAPI;
  private application: Application;
  private static instance: CompositionRoot | null = null;

  public static createCompositionRoot(context: Environment) {
    if (!CompositionRoot.instance) {
      CompositionRoot.instance = new this(context);
    }
    return CompositionRoot.instance;
  }

  private constructor(context: Environment) {
    this.context = context;
    this.database = this.createDatabase();
    this.transactionalEmailAPI = this.createTransactionalEmailAPI();
    this.contactListAPI = this.createContactListAPI();
    this.postService = this.createPostService();
    this.userService = this.createUserService();
    this.marketingService = this.createMarketingService();
    this.application = this.createApplication();
    this.webServer = this.createWebServer();
  }

  public getContext() {
    return this.context;
  }


  private createUserService() {
    const database = this.getDatabase();
    const emailService = this.getTransactionalEmailAPI();
    return new UserService(database, emailService);
  }

  private createApplication() {
    const userService = this.getUserService();
    const marketingService = this.getMarketingService();
    const postService = this.getPostService();
    
    return {
      user: userService,
      marketing: marketingService,
      posts: postService
    };
  }

  private createTransactionalEmailAPI() {
    if (this.context === "production") {
      return new MailjetTransactionalEmail() as TransactionEmailAPI;
    }

    /**
     * For 'testing' and 'staging', if we wanted to use a different one
     */

    // When we execute unit tests, we use this.
    return new TransactionalEmailAPISpy() as TransactionEmailAPI;
  }

  private createContactListAPI() {
    if (this.context === "production") {
      return new MailchimpContactList();
    }

    return new ContactListAPISpy();
  }

  public getUserService() {
    if (this.userService) return this.userService;
    return this.createUserService();
  }

  private getPostService() {
    if (this.postService) return this.postService;
    return this.createPostService();
  }

  public getTransactionalEmailAPI() {
    if (this.transactionalEmailAPI) return this.transactionalEmailAPI;
    return this.createTransactionalEmailAPI();
  }

  public getMarketingService () {
    if (this.marketingService) return this.marketingService;
    return this.createMarketingService();
  }

  public getContactListAPI() {
    if (this.contactListAPI) return this.contactListAPI;
    return this.createContactListAPI()
  }

  public getApplication() {
    if (this.application) return this.application;
    return this.createApplication();
  }

  private createMarketingService () {
    const contactListAPI = this.getContactListAPI();
    return new MarketingService(contactListAPI);
  }

  private createPostService() {
    const database = this.getDatabase();
    return new PostService(database);
  }

  private createDatabase(): Database {
    if (this.database) return this.database;

    if (this.context === "development") {
      return {
        users: new InMemoryUserRepo(),
        posts: new InMemoryPostRepo(),
      };
    } else {
      const prisma = new PrismaClient();
      return {
        users: new ProductionUserRepo(prisma),
        posts: new ProductionPostRepo(prisma),
      };
    }
  }

  getDatabase() {
    if (!this.database) this.createDatabase();
    return this.database;
  }

  createWebServer() {
    const application = this.getApplication();
    return new WebServer({ port: 3000, application });
  }

  getWebServer() {
    return this.webServer;
  }
}
