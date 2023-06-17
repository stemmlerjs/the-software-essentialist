
import "reflect-metadata"

import { ExpressRESTAPI } from "../shared/infra/api/expressRestAPI";
import { Application } from "./application";
import { EmailService } from "./email/application/emailService";
import { ForumService } from "./forum/application/forumService";
import { UsersService } from "./users/application/usersService";
import { UsersController } from "./users/infra/usersController";
import { PrismaUserRepo, UserRepo } from "./users/infra/usersRepo";
import { E2EWebTestDriver } from "../shared/testing/E2EWebTestDriver";

interface Services {
  users: UsersService;
  email: EmailService;
  forum: ForumService;
}

interface Repos {
  usersRepo: UserRepo;
}

export class CompositionRoot {
  private webAPI: ExpressRESTAPI;
  private application: Application;
  private services: Services;
  private repos: Repos;
  private e2eWebTestDriver: E2EWebTestDriver;

  constructor () {
    this.repos = this.createRepos();
    this.services = this.createServices();
    this.application = this.createApplication();
    this.webAPI = this.createWebAPI()
    this.e2eWebTestDriver = this.createE2eWebTestDriver();
  }

  private createE2eWebTestDriver () {
    let webAPI = this.getWebAPI();
    return new E2EWebTestDriver(webAPI);
  }

  private createRepos () {
    let usersRepo = new PrismaUserRepo();
    return { usersRepo } 
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

  public getE2EWebTestDriver () {
    return this.e2eWebTestDriver;
  }
}

// Application


// Worker


// Relay