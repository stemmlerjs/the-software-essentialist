import express from "express";

import { parseForResponse } from "../shared/utils";
import { ClassId, CreateClassDTO, EnrollStudentDTO } from "../dtos/classes";
import ClassesService from "../services/classes";
import { ErrorHandler } from "../shared/errors";

class ClassesController {
  private router: express.Router;

  constructor(
    private classesService: ClassesService,
    private errorHandler: ErrorHandler
  ) {
    this.router = express.Router();
    this.routes();
    this.setupErrorHandler();
  }

  getRouter() {
    return this.router;
  }

  private setupErrorHandler() {
    this.router.use(this.errorHandler);
  }

  private routes() {
    this.router.post("/", this.createClass);
    this.router.post("/enrollments", this.enrollStudent);
    this.router.get("/:id/assignments", this.getAssignments);
  }

  private createClass = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const dto = CreateClassDTO.fromRequest(req.body);
      const data = await this.classesService.createClass(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  private enrollStudent = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const dto = EnrollStudentDTO.fromRequest(req.body);
      const data = await this.classesService.enrollStudent(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  private getAssignments = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const dto = ClassId.fromRequestParams(req.params);
      const data = await this.classesService.getAssignments(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ClassesController;
