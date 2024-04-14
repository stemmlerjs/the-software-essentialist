
import { EmailService } from "../../modules/email/emailService";
import { EmailServiceSpy } from "../../modules/email/emailServiceSpy";
import { MailjetEmailService } from "../../modules/email/mailjetEmailService";
import { Mailchimp } from "../../modules/marketing/mailchimp";
import { MarketingController } from "../../modules/marketing/marketingController";
import { MarketingServiceSpy } from "../../modules/marketing/marketingServiceSpy";
import { PostsController } from "../../modules/posts/postController";
import { PostService } from "../../modules/posts/postService";
import { UserController } from "../../modules/users/userController";
import { UserService } from "../../modules/users/usersService";
import { Application } from "../application/applicationInterface";
import { Environment } from "../config";
import { DBConnection } from "../database/database";
import { WebServer } from "../webAPI/webServer";

export class CompositionRoot {

  private webServer: WebServer;
  private dbConnection: DBConnection;
  private context: Environment;
  private application: Application;
  private static instance: CompositionRoot | null = null;

  public static createCompositionRoot (context: Environment) {
    if (!CompositionRoot.instance) {
      CompositionRoot.instance = new this(context);
    }
    return CompositionRoot.instance;
  }

  private constructor (context: Environment) {
    this.context = context;
    this.dbConnection = this.createDBConnection();
    this.application = this.createApplication();
    this.webServer = this.createWebServer();
  }

  public getContext () {
    return this.context;
  }

  public getUserService () {
    if (!this.application || !this.application.user) {
      return this.createUserService();
    }
    return this.application.user;
  }

  private createApplication () {
    return {
      user: this.getUserService(),
      email: this.getEmailService(),
      marketing: this.getMarketingService(),
      posts: this.getPostService(),
    }
  }

  private createUserService () {
    const dbConnection = this.getDBConnection();
    const emailService = this.getEmailService();
    return new UserService(dbConnection, emailService);
  }

  private createEmailService () {
    if (this.context === 'production') {
      return new MailjetEmailService() as EmailService;
    } 
    return new EmailServiceSpy() as EmailService;
  }

  public getEmailService () {
    if (!this.application || !this.application.email) {
      return this.createEmailService()
    }
    return this.application.email;
  }

  public getMarketingService () {
    if(!this.application || !this.application.marketing) {
      return this.createMarketingService()
    }
    return this.application.marketing;
  }

  private createMarketingService () {
    if (this.context === 'production') {
      return new Mailchimp();
    } 

    return new MarketingServiceSpy();
  }

  private getPostService () {
    if (!this.application || !this.application.posts) {
      return this.createPostService()
    }
    return this.application.posts;
  }

  private createPostService () {
    let dbConnection = this.getDBConnection();
    return new PostService(dbConnection);
  }

  private getApplication () {
    if (!this.application) this.createApplication();
    return this.application;
  }

  private createControllers () {
    const application = this.getApplication();
    const userController = new UserController(application);
    const postController = new PostsController(application);
    const marketingController = new MarketingController(application)

    return {
      userController, 
      postController,
      marketingController
    }
  }

  private createDBConnection () {
    const dbConnection = new DBConnection();
    if (!this.dbConnection) {
      this.dbConnection = dbConnection;
    }
    return dbConnection;
  }

  getDBConnection () {
    if (!this.dbConnection) this.createDBConnection();
    return this.dbConnection;
  }

  createWebServer () {
    const controller = this.createControllers();
    return new WebServer({ port: 3000 }, controller)
  }

  getWebServer () {
    return this.webServer;
    
  }
}