import express from "express";

import { ErrorHandler } from "../shared/errors";
import {
  AssignStudentDTO,
  CreateAssignmentDTO,
  GradeAssignmentDTO,
  SubmitAssignmentDTO,
} from "../dtos/assignments";
import { parseForResponse } from "../shared/utils";
import AssignmentsService from "../services/assignments";

class AssignmentsController {
  private router: express.Router;

  constructor(
    private assignmentsService: AssignmentsService,
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
    this.router.post("/", this.createAssignment);
    this.router.get("/:id", this.assignStudent);
    this.router.post("/submit", this.submitAssignment);
    this.router.post("/grade", this.gradeAssignment);
  }

  private createAssignment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const dto = CreateAssignmentDTO.fromRequest(req.body);
      const data = await this.assignmentsService.createAssignment(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  private assignStudent = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const dto = AssignStudentDTO.fromRequest(req.body);
      const data = await this.assignmentsService.assignStudent(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  private submitAssignment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const dto = SubmitAssignmentDTO.fromRequest(req.body);
      const data = await this.assignmentsService.submitAssignment(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  private gradeAssignment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const dto = GradeAssignmentDTO.fromRequest(req.body);
      const data = await this.assignmentsService.gradeAssignment(dto);

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

export default AssignmentsController;
