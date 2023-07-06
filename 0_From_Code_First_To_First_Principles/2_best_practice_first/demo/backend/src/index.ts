import express, { Request, Response } from 'express';
import { createUser, editUser, getUserByEmail } from './controllers/userController';
import { Server } from 'http';
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
  private express: express.Express;
  private server: Server | undefined;

  constructor (private config: WebServerConfig) {
    this.express = this.createExpress();
    this.configureExpress();
    this.setupRoutes();
  }

  private createExpress () {
    return express();
  }

  private configureExpress () {
    this.express.use(cors());
    this.express.use(express.json());
  }

  private setupRoutes () {
    // Get a user by email
    this.express.get('/users', (req, res) => getUserByEmailController(req, res));

    // Edit a user
    this.express.post('/users/edit/:userId', (req, res) => editUserByIdController(req, res));

    // Create a new user
    this.express.post('/users/new', (req, res) => createNewUserController(req, res));
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
