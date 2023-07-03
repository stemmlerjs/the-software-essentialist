
import "reflect-metadata"

import { ExpressRESTAPI } from "../../../infra/api/expressRestAPI";
import { Application } from "../../../../modules/application";
import { EmailService } from "../../../../modules/email/application/emailService";
import { ForumService } from "../../../../modules/forum/application/forumService";
import { UsersService } from "../../../../modules/users/application/usersService";
import { UsersController } from "../../../../modules/users/infra/usersController";
import { PrismaUserRepo, UserRepo } from "../../../../modules/users/infra/usersRepo";
import { MembersRepo, PrismaMembersRepo } from "../../../../modules/forum/infra/membersRepo";
import { ApplicationDriver } from "../applicationDriver/applicationDriver";
import { SystemEnvType } from "../../domain/systemEnv";

import { WebApplicationDriver } from "../applicationDriver/webApplicationDriver";
import { TestWebApplicationDriver } from "../applicationDriver/testWebApplicationDriver";
import { DatabaseConnection } from "../../../infra/database/ports/databaseConnection";
import { PrismaDBConnection } from "../../../infra/database/adapters/prismaDBConnection";

interface Services {
  users: UsersService;
  email: EmailService;
  forum: ForumService;
}

export interface Repos {
  usersRepo: UserRepo;
  membersRepo: MembersRepo;
}

export class CompositionRoot {
  private webAPI: ExpressRESTAPI;
  private application: Application;
  private services: Services;
  private repos: Repos;
  private applicationDriver: ApplicationDriver;
  private context: SystemEnvType;
  private dbConnection: DatabaseConnection;

  constructor (context?: SystemEnvType) {
    this.context = context ? context : 'prod';
    this.repos = this.createRepos();
    this.services = this.createServices();
    this.application = this.createApplication();
    this.webAPI = this.createWebAPI()
    this.applicationDriver = this.createApplicationDriver();
    this.dbConnection = this.createDbConnection();
  }

  public setContext (context: SystemEnvType) {
    this.context = context;
  }

  private createDbConnection () {
    return new PrismaDBConnection();
  }

  private createApplicationDriver () {
    let webAPI = this.getWebAPI();
    let dbConnection = this.getDbConnection();
    let repos = this.getRepos();

    if (this.context === 'test') {
      return new TestWebApplicationDriver(webAPI, dbConnection, repos)
    } 

    return new WebApplicationDriver(webAPI, dbConnection);
  }

  private createRepos () {
    let usersRepo = new PrismaUserRepo();
    let membersRepo = new PrismaMembersRepo();
    return { usersRepo, membersRepo } 
  }

  private createServices () {
    let { usersRepo } = this.repos;
    let users = new UsersService(usersRepo);
    let email = new EmailService();
    let forum = new ForumService();
    return { users, email, forum }
  }

  private createApplication () {
    let { users, forum, email } = this.services;
    return new Application(users, forum, email)
  }

  private createWebAPI () {
    let { application } = this;
    let usersController = new UsersController(application);

    return new ExpressRESTAPI({
      application,
      controllers: { usersController }
    })
  }
  public getWebAPI (): ExpressRESTAPI {
    return this.webAPI;
  }

  public getRepos (): Repos {
    return this.repos;
  }

  public getApplicationDriver () {
    return this.applicationDriver;
  }

  private getDbConnection () {
    return this.dbConnection;
  }

  public getApplication () {
    return this.application;
  }
}

// Application


// Worker


// Relay