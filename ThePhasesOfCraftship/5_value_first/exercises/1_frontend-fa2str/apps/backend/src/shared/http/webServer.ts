
import express from "express";
import cors from "cors";
import { Server } from "http";
import { ProcessService } from "../processes/processService";
import { Config } from "@dddforum/config";

export class WebServer {
  private express: express.Express;
  private state: "stopped" | "started";
  private instance: Server | undefined;

  constructor(private config: Config) {
    this.state = "stopped";
    this.express = express();
    this.initializeServer();
  }

  private initializeServer() {
    this.addMiddlewares();
    this.express.use(cors());
  }

  private addMiddlewares() {
    this.express.use(express.json());
  }

  public mountRouter(path: string, router: express.Router) {
    this.express.use(path, router);
  }

  public getApplication() {
    return this.express;
  }

  async start(): Promise<void> {
    return new Promise((resolve, _reject) => {
      const wsConfig = this.config.webserver;
      ProcessService.killProcessOnPort(wsConfig.port, () => {
        console.log("Starting the server");
        this.instance = this.express.listen(wsConfig.port, () => {
          console.log(`Server is running on port ${wsConfig.port}`);
          this.state = "started";
          resolve();
        });
      });
    });
  }

  async stop() {
    return new Promise((resolve, reject) => {
      if (!this.instance) return reject("Server not started");
      this.instance.close((err) => {
        if (err) return reject("Error stopping the server");
        this.state = "stopped";
        return resolve("Server stopped");
      });
    });
  }

  isStarted() {
    return this.state === "started";
  }
}
