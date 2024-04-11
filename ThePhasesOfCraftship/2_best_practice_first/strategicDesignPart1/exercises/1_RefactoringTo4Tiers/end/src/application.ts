import express, { Application as ExpressApp } from "express";
import {
  AssignmentsController,
  ClassesController,
  StudentsController,
} from "./controllers";
import { enableGracefulShutdown } from "./shared/server";

class Application {
  private readonly _instance: ExpressApp;

  get instance(): ExpressApp {
    return this._instance;
  }
  constructor(
    private studentsController: StudentsController,
    private classesController: ClassesController,
    private assignmentsController: AssignmentsController
  ) {
    this._instance = express();
    this.addMiddlewares();
    this.registerRouters();
  }
  private addMiddlewares() {
    this._instance.use(express.json());
  }

  private registerRouters() {
    this._instance.use("/students", this.studentsController.getRouter());
    this._instance.use("/classes", this.classesController.getRouter());
    this._instance.use("/assignments", this.assignmentsController.getRouter());
  }

  public start(port: number) {
    const server = this._instance.listen(port, () =>
      console.log(`Listening on port ${port}`)
    );
    enableGracefulShutdown(server);
  }
}

export default Application;
