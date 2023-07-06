import express from "express";
import { Server } from "http";
import { UserController } from "../../../modules/users/userController";
const cors = require("cors");
const { exec } = require("child_process");

function killProcessOnPort(port: number) {
  const killCommand =
    process.platform === "win32"
      ? `netstat -ano | findstr :${port} | findstr LISTENING`
      : `lsof -i:${port} -t`;

  exec(killCommand, (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.error(`Failed to execute the command: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Command execution returned an error: ${stderr}`);
      return;
    }

    const processId = stdout.trim();
    if (processId) {
      const killProcessCommand =
        process.platform === "win32"
          ? `taskkill /F /PID ${processId}`
          : `kill ${processId}`;

      exec(killProcessCommand, (error: any, stdout: any, stderr: any) => {
        if (error) {
          console.error(`Failed to kill the process: ${error.message}`);
          return;
        }

        console.log(`Process running on port ${port} has been killed.`);
      });
    } else {
      console.log(`No process found running on port ${port}.`);
    }
  });
}

type WebServerConfig = {
  port: number;
};

export class WebServer {
  private express: express.Express;
  private server: Server | undefined;
  private started: boolean = false;

  constructor(private config: WebServerConfig, controller: UserController) {
    this.express = this.createExpress();
    this.configureExpress();
    this.setupRoutes(controller);
  }

  private createExpress() {
    return express();
  }

  private configureExpress() {
    this.express.use(cors());
    this.express.use(express.json());
  }

  private setupRoutes(controller: UserController) {
    // Get a user by email
    this.express.get("/users", (req, res) =>
      controller.getUserByEmailController(req, res)
    );

    // Edit a user
    this.express.post("/users/edit/:userId", (req, res) =>
      controller.editUserByIdController(req, res)
    );

    // Create a new user
    this.express.post("/users/new", (req, res) =>
      controller.createUser(req, res)
    );
  }

  getHttp() {
    if (!this.server) throw new Error("Server not yet started");
    return this.server;
  }

  async start(): Promise<void> {
    killProcessOnPort(3000);
    return new Promise((resolve, reject) => {
      this.server = this.express.listen(this.config.port, () => {
        console.log(`Server is running on port ${this.config.port}`);
        this.started = true;
        resolve();
      });
    })
  }

  isStarted () {
    return this.started;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.server) {
        this.server.close(() => {
          this.started = false;
          resolve();
        });
      }
    });
  }
}
