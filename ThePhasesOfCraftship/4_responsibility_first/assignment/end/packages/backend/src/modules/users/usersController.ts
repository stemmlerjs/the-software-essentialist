import { Request, Response, Router } from 'express';
import { Config } from '../../shared/config';
import { ErrorRequestHandler } from 'express';

export class UsersController {
  private router: Router;
  
  constructor(
    config: Config,
    private errorHandler: ErrorRequestHandler
  ) {
    this.router = Router();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  getRouter() {
    return this.router;
  }
  
  private setupRoutes() {
    // this.router.get("/authenticate", this.authorize.bind(this));
  }

  private setupErrorHandler() {
    this.router.use(this.errorHandler);
  }
  
}
