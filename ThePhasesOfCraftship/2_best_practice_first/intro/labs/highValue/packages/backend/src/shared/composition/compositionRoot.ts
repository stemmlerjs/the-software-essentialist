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

export class CompositionRoot {
  private webServer: WebServer;
  private database: Database;
  private context: Environment;
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
    this.application = this.createApplication();
    this.webServer = this.createWebServer();
  }

  public getContext() {
    return this.context;
  }

  public getUserService() {
    if (!this.application || !this.application.user) {
      return this.createUserService();
    }
    return this.application.user;
  }

  private createApplication() {
    return {
      user: this.getUserService(),
      email: this.getEmailService(),
      marketing: this.getMarketingService(),
      posts: this.getPostService(),
    };
  }

  private createUserService() {
    const database = this.getDatabase();
    const emailService = this.getEmailService();
    return new UserService(database, emailService);
  }

  private createEmailService() {
    if (this.context === "production") {
      return new MailjetEmailService() as EmailService;
    }
    return new EmailServiceSpy() as EmailService;
  }

  public getEmailService() {
    if (!this.application || !this.application.email) {
      return this.createEmailService();
    }
    return this.application.email;
  }

  public getMarketingService() {
    if (!this.application || !this.application.marketing) {
      return this.createMarketingService();
    }
    return this.application.marketing;
  }

  private createMarketingService() {
    if (this.context === "production") {
      return new Mailchimp();
    }

    return new MarketingServiceSpy();
  }

  private getPostService() {
    if (!this.application || !this.application.posts) {
      return this.createPostService();
    }
    return this.application.posts;
  }

  private createPostService() {
    let dbConnection = this.getDatabase();
    return new PostService(dbConnection);
  }

  public getApplication() {
    if (!this.application) this.createApplication();
    return this.application;
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
