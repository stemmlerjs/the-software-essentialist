
import express, { Request, Response } from 'express';
import { Server } from 'http';
import { UserController } from '../../../modules/users/userController';
const cors = require('cors');

type WebServerConfig = {
  port: number;
}

export class WebServer {
  private express: express.Express;
  private server: Server | undefined;

  constructor (private config: WebServerConfig, controller: UserController) {
    this.express = this.createExpress();
    this.configureExpress();
    this.setupRoutes(controller);
  }

  private createExpress () {
    return express();
  }

  private configureExpress () {
    this.express.use(cors());
    this.express.use(express.json());
  }

  private setupRoutes (controller: UserController) {
    // Get a user by email
    this.express.get('/users', (req, res) => controller.getUserByEmailController(req, res));

    // Edit a user
    this.express.post('/users/edit/:userId', (req, res) => controller.editUserByIdController(req, res));

    // Create a new user
    this.express.post('/users/new', (req, res) => controller.createUser(req, res));
  }

  getServer () {
    if (!this.server) throw new Error('Server not yet started');
    return this.server;
  }

  async start (): Promise<void> {
    this.server = this.express.listen(this.config.port, () => {
      console.log(`Server is running on port ${this.config.port}`);
    });
  }

  async stop (): Promise<void> {
    this.server?.close(() => {
      console.log('server closed')
    })
  }
}
