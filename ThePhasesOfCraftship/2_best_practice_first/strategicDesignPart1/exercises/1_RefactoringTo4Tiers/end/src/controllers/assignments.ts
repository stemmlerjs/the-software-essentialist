import express from "express";

import { ErrorHandlerType } from "../shared/errors";
import { AssignStudentDTO, CreateAssignmentDTO } from "../dtos/assignments";
import { parseForResponse } from "../shared/utils";
import AssignmentsService from "../services/assignments";

class AssignmentsController {
  private router: express.Router;

  constructor(
    private assignmentsService: AssignmentsService,
    private errorHandler: ErrorHandlerType
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
}

// // POST student submitted assignment
// router.post("/submit", async (req, res) => {
//   try {
//     if (isMissingKeys(req.body, ["id"])) {
//       return res.status(400).json({
//         error: Errors.ValidationError,
//         data: undefined,
//         success: false,
//       });
//     }

//     const { id } = req.body;

//     // check if student assignment exists
//     const studentAssignment = await prisma.studentAssignment.findUnique({
//       where: {
//         id,
//       },
//     });

//     if (!studentAssignment) {
//       return res.status(404).json({
//         error: Errors.AssignmentNotFound,
//         data: undefined,
//         success: false,
//       });
//     }

//     const studentAssignmentUpdated = await prisma.studentAssignment.update({
//       where: {
//         id,
//       },
//       data: {
//         status: "submitted",
//       },
//     });

//     res.status(200).json({
//       error: undefined,
//       data: parseForResponse(studentAssignmentUpdated),
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: Errors.ServerError,
//       data: undefined,
//       success: false,
//     });
//   }
// });

// // POST student assignment graded
// router.post("/grade", async (req, res) => {
//   try {
//     if (isMissingKeys(req.body, ["id", "grade"])) {
//       return res.status(400).json({
//         error: Errors.ValidationError,
//         data: undefined,
//         success: false,
//       });
//     }

//     const { id, grade } = req.body;

//     // validate grade
//     if (!["A", "B", "C", "D"].includes(grade)) {
//       return res.status(400).json({
//         error: Errors.ValidationError,
//         data: undefined,
//         success: false,
//       });
//     }

//     // check if student assignment exists
//     const studentAssignment = await prisma.studentAssignment.findUnique({
//       where: {
//         id,
//       },
//     });

//     if (!studentAssignment) {
//       return res.status(404).json({
//         error: Errors.AssignmentNotFound,
//         data: undefined,
//         success: false,
//       });
//     }

//     const studentAssignmentUpdated = await prisma.studentAssignment.update({
//       where: {
//         id,
//       },
//       data: {
//         grade,
//       },
//     });

//     res.status(200).json({
//       error: undefined,
//       data: parseForResponse(studentAssignmentUpdated),
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: Errors.ServerError,
//       data: undefined,
//       success: false,
//     });
//   }
// });

// // GET assignment by id
// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!isUUID(id)) {
//       return res.status(400).json({
//         error: Errors.ValidationError,
//         data: undefined,
//         success: false,
//       });
//     }
//     const assignment = await prisma.assignment.findUnique({
//       include: {
//         class: true,
//         studentTasks: true,
//       },
//       where: {
//         id,
//       },
//     });

//     if (!assignment) {
//       return res.status(404).json({
//         error: Errors.AssignmentNotFound,
//         data: undefined,
//         success: false,
//       });
//     }

//     res.status(200).json({
//       error: undefined,
//       data: parseForResponse(assignment),
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: Errors.ServerError,
//       data: undefined,
//       success: false,
//     });
//   }
// });

// export default router;
export default AssignmentsController;
