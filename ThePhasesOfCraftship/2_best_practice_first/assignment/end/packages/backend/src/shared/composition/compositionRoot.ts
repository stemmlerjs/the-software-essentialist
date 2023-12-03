
import { EmailService } from "../../modules/email/emailService";
import { EmailServiceSpy } from "../../modules/email/emailServiceSpy";
import { MailjetEmailService } from "../../modules/email/mailjetEmailService";
import { PostsController } from "../../modules/posts/postController";
import { UserController } from "../../modules/users/userController";
import { Environment } from "../config";
import { WebServer } from "../http/webServer";
import { PrismaClient } from '@prisma/client';

export class CompositionRoot {

  private webServer: WebServer;
  private prisma: PrismaClient;
  private emailService: EmailService;
  private context: Environment;
  private static instance: CompositionRoot | null = null;

  public static createCompositionRoot (context: Environment) {
    if (!CompositionRoot.instance) {
      CompositionRoot.instance = new this(context);
    }
    return CompositionRoot.instance;
  }

  private constructor (context: Environment) {
    this.context = context;
    this.emailService = this.createEmailService();
    this.prisma = this.createPrisma();
    this.webServer = this.createWebServer();
  }

  public getContext () {
    return this.context;
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

  private createControllers () {
    const prisma = this.getPrisma();
    const emailService = this.getEmailService();
    const userController = new UserController(prisma, emailService);
    const postController = new PostsController(prisma);

    return {
      userController, 
      postController
    }
  }

  private createPrisma () {
    return new PrismaClient()
  }

  getPrisma () {
    return this.prisma;
  }

  createWebServer () {
    const controller = this.createControllers();
    return new WebServer({ port: 3000 }, controller)
  }

  getWebServer () {
    return this.webServer;
    
  }
}