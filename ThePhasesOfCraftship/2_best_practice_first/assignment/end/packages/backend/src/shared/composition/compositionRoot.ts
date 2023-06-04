
import { EmailService } from "../../modules/email/emailService";
import { EmailServiceSpy } from "../../modules/email/emailServiceSpy";
import { MailjetEmailService } from "../../modules/email/mailjetEmailService";
import { Mailchimp } from "../../modules/marketing/mailchimp";
import { MarketingController } from "../../modules/marketing/marketingController";
import { MarketingService } from "../../modules/marketing/marketingService";
import { MarketingServiceSpy } from "../../modules/marketing/marketingServiceSpy";
import { PostsController } from "../../modules/posts/postController";
import { PostService } from "../../modules/posts/postService";
import { UserController } from "../../modules/users/userController";
import { UserService } from "../../modules/users/usersService";
import { Environment } from "../config";
import { DBConnection } from "../database/database";
import { WebServer } from "../http/webServer";

export class CompositionRoot {

  private webServer: WebServer;
  private dbConnection: DBConnection;
  private emailService: EmailService;
  private marketingService: MarketingService;
  private context: Environment;
  private static instance: CompositionRoot | null = null;
  private userService: UserService;
  private postService: PostService;

  public static createCompositionRoot (context: Environment) {
    if (!CompositionRoot.instance) {
      CompositionRoot.instance = new this(context);
    }
    return CompositionRoot.instance;
  }

  private constructor (context: Environment) {
    this.context = context;
    this.dbConnection = this.createDBConnection();
    this.marketingService = this.createMarketingService();
    this.emailService = this.createEmailService();
    this.userService = this.createUserService();
    this.postService = this.createPostService();
    this.webServer = this.createWebServer();
  }

  public getContext () {
    return this.context;
  }

  public getUserService () {
    return this.userService;
  }

  private createUserService () {
    const dbConnection = this.getDBConnection();
    const emailService = this.getEmailService();
    return new UserService(dbConnection, emailService);
  }

  private createEmailService () {
    if (this.context === 'production') {
      return new MailjetEmailService();
    } 

    return new EmailServiceSpy();
  }

  public getEmailService () {
    return this.emailService;
  }

  public getMarketingService () {
    return this.marketingService;
  }

  private createMarketingService () {
    if (this.context === 'production') {
      return new Mailchimp();
    } 

    return new MarketingServiceSpy();
  }

  private getPostService () {
    return this.postService
  }

  private createPostService () {
    let dbConnection = this.getDBConnection();
    return new PostService(dbConnection);
  }

  private createControllers () {
    const marketingService = this.getMarketingService();
    const postService = this.getPostService()
    const userService = this.getUserService();

    const userController = new UserController(userService);
    const postController = new PostsController(postService);
    const marketingController = new MarketingController(marketingService)

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