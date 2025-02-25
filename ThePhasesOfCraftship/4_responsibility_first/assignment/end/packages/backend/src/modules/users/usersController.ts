import { Request, Response, Router } from 'express';
import { Auth0 } from './externalServices/adapters/auth0';
import { Config } from '../../shared/config';
import { ErrorRequestHandler } from 'express';

export class UsersController {
  private router: Router;
  private auth0: Auth0;
  
  constructor(
    config: Config,
    private errorHandler: ErrorRequestHandler
  ) {
    this.router = Router();
    this.auth0 = new Auth0(
      config.auth0.domain,
      config.auth0.clientId,
      config.auth0.clientSecret
    );
    this.setupRoutes();
    this.setupErrorHandler();
  }

  getRouter() {
    return this.router;
  }
  
  private setupRoutes() {
    this.router.get("/authenticate", this.authorize.bind(this));
  }

  private setupErrorHandler() {
    this.router.use(this.errorHandler);
  }
  
  private async authorize(req: Request, res: Response) {
    const code = req.query.code as string;
    try {
      const result = await this.auth0.getUserById(code);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: 'Failed to handle auth callback' });
    }
  }
}