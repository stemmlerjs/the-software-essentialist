
import "reflect-metadata"

import { ExpressRESTAPI } from "../shared/infra/api/expressRestAPI";
import { Application } from "./application";
import { EmailService } from "./email/application/emailService";
import { ForumService } from "./forum/application/forumService";
import { UsersService } from "./users/application/usersService";
import { UsersController } from "./users/infra/usersController";

let usersRepo = new 

let users = new UsersService();
let email = new EmailService();
let forum = new ForumService();

let application = new Application(users, forum, email)

// Application
let usersController = new UsersController(application);

let api = new ExpressRESTAPI({
  application,
  controllers: { usersController }
})

// Worker


// Relay


