
import { ApplicationAPI } from '../../../modules/applicationAPI';
import express from 'express';
import bodyParser from 'body-parser';
import { UsersController } from '../../../modules/users/infra/usersController';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { killProcessOnPort } from '../../bootstrap/service/processService/killOnPort';

type Controllers = {
  usersController: UsersController;
};

type ExpressRESTAPIDependencies = {
  application: ApplicationAPI;
  controllers: Controllers;
  port?: number;
};

export class ExpressRESTAPI {
  private dependencies: ExpressRESTAPIDependencies;
  private instance: express.Express;
  private server: Server<typeof IncomingMessage, typeof ServerResponse> | undefined;

  constructor(dependencies: ExpressRESTAPIDependencies) {
    this.dependencies = {
      ...dependencies,
      port: dependencies.port ? dependencies.port : 3000,
    };
    this.instance = express();
    this.setupRoutes();
    this.server = undefined;
  }

  setupRoutes() {
    this.instance.use(bodyParser.json());
    this.instance.get('/health', (req, res) => res.status(200).send({ ok: true }))
    this.instance.post('/users', (req, res) =>
      this.dependencies.controllers.usersController.createUser(req, res),
    );
  }

  public getInstance () {
    return this.instance;
  }

  start(): Promise<void> {
    killProcessOnPort(3000);
    return new Promise<void>((resolve, reject) => {
      this.server = this.instance.listen(
        this.dependencies.port,
        (err?: Error) => {
          if (err) {
            reject(err);
          } else {
            console.log(`Server is running on port ${this.dependencies.port}`);
            resolve();
          }
        },
      );
    });
  }

  stop() {
    return new Promise<void>((resolve, reject) => {
      if (!this.server) {
        console.log('Server is not running.')
        resolve();
      }

      this.server?.close((err?: Error) => {
        if (err) {
          reject(err);
        } else {
          console.log('Server has been stopped');
          resolve();
        }
      });
    });
  }
}
