
import "reflect-metadata"

import { ExpressRESTAPI } from "../shared/infra/api/expressRestAPI";
import { Application } from "./application";
import { EmailService } from "./email/application/emailService";
import { ForumService } from "./forum/application/forumService";
import { UsersService } from "./users/application/usersService";
import { UsersController } from "./users/infra/usersController";
import { PrismaUserRepo, UserRepo } from "./users/infra/usersRepo";

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

  constructor () {
    this.repos = this.createRepos();
    this.services = this.createServices();
    this.application = this.createApplication();
    this.webAPI = this.createWebAPI()
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
    
  }
}

// Application


// Worker


// Relay