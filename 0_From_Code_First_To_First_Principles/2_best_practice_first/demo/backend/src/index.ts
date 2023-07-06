import express, { Request, Response } from 'express';
import { createUser, editUser, getUserByEmail } from './controllers/userController';
const cors = require('cors');

const createNewUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user.' });
  }
}

const editUserByIdController = async (req: Request, res: Response) => {
  try {
    const user = await editUser(Number(req.params.userId), req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit user.' });
  }
}

const getUserByEmailController = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const user = await getUserByEmail(email);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user.' });
  }
}

type WebServerConfig = {
  port: number;
}

export class WebServer {
  private instance: express.Express;

  constructor (private config: WebServerConfig) {
    this.instance = this.createInstance();
    this.configureInstance();
    this.setupRoutes();
  }

  private createInstance () {
    return express();
  }

  private configureInstance () {
    this.instance.use(cors());
    this.instance.use(express.json());
  }

  private setupRoutes () {
    // Get a user by email
    this.instance.get('/users', (req, res) => getUserByEmailController(req, res));

    // Edit a user
    this.instance.post('/users/edit/:userId', (req, res) => editUserByIdController(req, res));

    // Create a new user
    this.instance.post('/users/new', (req, res) => createNewUserController(req, res));
  }

  getExpressApp () {
    return;
  }

  async start (): Promise<void> {
    this.instance.listen(this.config.port, () => {
      console.log(`Server is running on port ${this.config.port}`);
    });
  }

  async stop (): Promise<void> {

  }
}

new WebServer({ port: 3000 }).start();