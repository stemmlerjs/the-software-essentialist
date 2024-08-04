import express from "express";

import { parseForResponse } from "../shared/utils";
import Errors from "../shared/constants";
import { CreateStudentDTO, StudentID } from "../dtos/students";
import StudentService from "../services/students";
import { ErrorHandler } from "../shared/errorsExceptionHandler";

class StudentsController {
  private router: express.Router;

  constructor(
    private studentService: StudentService,
    private errorHandler: ErrorHandler
  ) {
    this.router = express.Router();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  getRouter() {
    return this.router;
  }

  private setupErrorHandler() {
    this.router.use(this.errorHandler);
  }

  private setupRoutes() {
    this.router.post("/", this.createStudent);
    this.router.get("/", this.getAllStudents);
    this.router.get("/:id", this.getStudent);
    this.router.get("/:id/assignments", this.getAssignments);
    this.router.get("/:id/grades", this.getGrades);
  }

  private async createStudent(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const dto = CreateStudentDTO.fromRequest(req.body);
      const data = await this.studentService.createStudent(dto);
      res.status(201).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  private async getAllStudents(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const data = await this.studentService.getAllStudents();
      res.status(200).json({ error: undefined, data: data, success: true });
    } catch (error) {
      next(error);
    }
  }

  private async getStudent(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const dto = StudentID.fromRequestParams(req.params);
      const data = await this.studentService.getStudent(dto);

      if (!data) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }
      res.status(200).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  private async getAssignments(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const dto = StudentID.fromRequestParams(req.params);

      const data = await this.studentService.getAssignments(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  private async getGrades(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const dto = StudentID.fromRequestParams(req.params);

      const data = await this.studentService.getGrades(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default StudentsController;
