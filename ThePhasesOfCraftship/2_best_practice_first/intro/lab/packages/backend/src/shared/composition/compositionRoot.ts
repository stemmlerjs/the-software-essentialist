import { PrismaClient } from "@prisma/client";
import { EmailService } from "../../modules/email/emailService";
import { EmailServiceSpy } from "../../modules/email/emailServiceSpy";
import { MailjetEmailService } from "../../modules/email/mailjetEmailService";
import { Mailchimp } from "../../modules/marketing/mailchimp";
import { MarketingServiceSpy } from "../../modules/marketing/marketingServiceSpy";
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
import { MarketingService } from "../../modules/marketing/marketingService";

export class CompositionRoot {
  private webServer: WebServer;
  private database: Database;
  private context: Environment;
  private emailService: EmailService;
  private postService: PostService;
  private userService: UserService;
  private marketingService: MarketingService;
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
    this.emailService = this.createEmailService();
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
    const emailService = this.getEmailService();
    return new UserService(database, emailService);
  }

  private createApplication() {
    const emailService = this.getEmailService();
    const userService = this.getUserService();
    const marketingService = this.getMarketingService();
    const postService = this.getPostService();
    
    return {
      user: userService,
      email: emailService,
      marketing: marketingService,
      posts: postService
    };
  }

  private createEmailService() {
    if (this.context === "production") {
      return new MailjetEmailService() as EmailService;
    }

    /**
     * For 'testing' and 'staging', if we wanted to use a different one
     */

    // When we execute unit tests, we use this.
    return new EmailServiceSpy() as EmailService;
  }

  private createMarketingService() {
    if (this.context === "production") {
      return new Mailchimp();
    }

    return new MarketingServiceSpy();
  }

  public getUserService() {
    if (this.userService) return this.userService;
    return this.createUserService();
  }

  private getPostService() {
    if (this.postService) return this.postService;
    return this.createPostService();
  }

  public getEmailService() {
    if (this.emailService) return this.emailService;
    return this.createEmailService();
  }

  public getMarketingService() {
    if (this.marketingService) return this.marketingService;
    return this.createMarketingService()
  }

  public getApplication() {
    if (this.application) return this.application;
    return this.createApplication();
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
