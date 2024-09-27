import express, { Request, Response } from "express";
import { prisma } from "./database";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const Errors = {
  ValidationError: "ValidationError",
  StudentNotFound: "StudentNotFound",
  ClassNotFound: "ClassNotFound",
  ClassAlreadyExists: "ClassAlreadyExists",
  AssignmentNotFound: "AssignmentNotFound",
  ServerError: "ServerError",
  ClientError: "ClientError",
  StudentAlreadyEnrolled: "StudentAlreadyEnrolled",
  StudentNotEnrolled: "StudentNotEnrolled",
  AssignmentAlreadySubmitted: "AssignmentAlreadySubmitted",
  NotSubmittedError: "NotSubmittedError",
  AlreadyAssignedAssignmentToStudent: 'AlreadyAssignedAssignmentToStudent',
  AlreadyGradedAssignment: 'AlreadyGradedAssignment'
};

function isMissingKeys(data: any, keysToCheckFor: string[]) {
  for (let key of keysToCheckFor) {
    if (data[key] === undefined) return true;
  }
  return false;
}

function parseForResponse(data: unknown) {
  return JSON.parse(JSON.stringify(data));
}

function isUUID(id: string) {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    id
  );
}

// API Endpoints

// POST student created
app.post("/students", async (req: Request, res: Response) => {
  try {
    if (isMissingKeys(req.body, ["name", "email"])) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    const { name, email } = req.body;

    const student = await prisma.student.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json({
      error: undefined,
      data: parseForResponse(student),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// POST class created
app.post("/classes", async (req: Request, res: Response) => {
  try {
    if (isMissingKeys(req.body, ["name"])) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    const { name } = req.body;

    const classroomExists = await prisma.class.findUnique({ where: { name }})

    if (classroomExists) {
      return res
      .status(409)
      .json({ error: Errors.ClassAlreadyExists, data: undefined, success: false });
    }

    const cls = await prisma.class.create({
      data: {
        name,
      },
    });

    res
      .status(201)
      .json({ error: undefined, data: parseForResponse(cls), success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// POST student assigned to class
app.post("/class-enrollments", async (req: Request, res: Response) => {
  try {
    if (isMissingKeys(req.body, ["studentId", "classId"])) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    const { studentId, classId } = req.body;

    // check if student exists
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      return res.status(404).json({
        error: Errors.StudentNotFound,
        data: undefined,
        success: false,
      });
    }

    // check if class exists
    const cls = await prisma.class.findUnique({
      where: {
        id: classId,
      },
    });

    // check if student is already enrolled in class
    const duplicatedClassEnrollment = await prisma.classEnrollment.findFirst({
      where: {
        studentId,
        classId,
      },
    });

    if (duplicatedClassEnrollment) {
      return res.status(409).json({
        error: Errors.StudentAlreadyEnrolled,
        data: undefined,
        success: false,
      });
    }

    if (!cls) {
      return res
        .status(404)
        .json({ error: Errors.ClassNotFound, data: undefined, success: false });
    }

    const classEnrollment = await prisma.classEnrollment.create({
      data: {
        studentId,
        classId,
      },
    });

    res.status(201).json({
      error: undefined,
      data: parseForResponse(classEnrollment),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// POST assignment created
app.post("/assignments", async (req: Request, res: Response) => {
  try {
    if (isMissingKeys(req.body, ["classId", "title"])) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    const { classId, title } = req.body;

    const assignment = await prisma.assignment.create({
      data: {
        classId,
        title,
      },
    });

    res.status(201).json({
      error: undefined,
      data: parseForResponse(assignment),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// POST student assigned to assignment
app.post("/student-assignments", async (req: Request, res: Response) => {
  try {
    if (isMissingKeys(req.body, ["studentId", "assignmentId"])) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    const { studentId, assignmentId } = req.body;

    // check if student exists
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      return res.status(404).json({
        error: Errors.StudentNotFound,
        data: undefined,
        success: false,
      });
    }

    // check if assignment exists
    const assignment = await prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
    });

    if (!assignment) {
      return res.status(404).json({
        error: Errors.AssignmentNotFound,
        data: undefined,
        success: false,
      });
    }

    const studentEnrolled = await prisma.classEnrollment.findFirst({
      where: {
        studentId,
        classId: assignment.classId,
      },
    });

    if (!studentEnrolled) {
      return res.status(404).json({
        error: Errors.StudentNotEnrolled,
        data: undefined,
        success: false,
      });
    }

    const alreadyAssignedAssignment = await prisma.studentAssignment.findFirst({ 
      where: {
        studentId: studentId,
        assignmentId: assignmentId
      }
    });

    if (alreadyAssignedAssignment) {
      return res.status(409).json({
        error: Errors.AlreadyAssignedAssignmentToStudent,
        data: undefined,
        success: false,
      });
    }

    const studentAssignment = await prisma.studentAssignment.create({
      data: {
        studentId,
        assignmentId,
      },
    });

    res.status(201).json({
      error: undefined,
      data: parseForResponse(studentAssignment),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// POST student submitted assignment
app.post("/student-assignments/submit", async (req: Request, res: Response) => {
  try {
    if (isMissingKeys(req.body, ["assignmentId", "studentId"])) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    const { studentId, assignmentId } = req.body;

    // check if student assignment exists
    const studentAssignment = await prisma.studentAssignment.findUnique({
      where: {
        studentId_assignmentId: {
          assignmentId,
          studentId,
        },
      },
    });

    if (!studentAssignment) {
      return res.status(404).json({
        error: Errors.AssignmentNotFound,
        data: undefined,
        success: false,
      });
    }

    // Check if assignment submission exists
    const assignmentSubmission = await prisma.assignmentSubmission.findFirst({
      where: {
        studentAssignmentId: studentAssignment.id
      }
    });

    if (assignmentSubmission) {
      return res.status(409).json({
        error: Errors.AssignmentAlreadySubmitted,
        data: undefined,
        success: false,
      });
    }

    const studentAssignmentUpdated = await prisma.assignmentSubmission.create({
      data: {
        studentAssignmentId: studentAssignment.id
      },
    },);

    res.status(201).json({
      error: undefined,
      data: parseForResponse(studentAssignmentUpdated),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// POST student assignment graded
app.post("/student-assignments/grade", async (req: Request, res: Response) => {
  try {
    if (isMissingKeys(req.body, ["studentId", "assignmentId", "grade"])) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    const { studentId, assignmentId, grade } = req.body;

    // validate grade
    if (!["A", "A+", "B", "C", "D", "F"].includes(grade)) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    // check if student assignment exists
    const studentAssignment = await prisma.studentAssignment.findUnique({
      where: {
        studentId_assignmentId: {
          assignmentId,
          studentId,
        },
      },
    });

    if (!studentAssignment) {
      return res.status(404).json({
        error: Errors.AssignmentNotFound,
        data: undefined,
        success: false,
      });
    }

    // Check if student assignment submitted
    const studentAssignmentSubmission = await prisma.assignmentSubmission.findFirst({
      where: {
        studentAssignmentId: studentAssignment.id
      }
    })

    if (!studentAssignmentSubmission) {
      return res.status(400).json({
        error: Errors.NotSubmittedError,
        data: undefined,
        success: false,
      });
    }

    const alreadyGradedAssignment = await prisma.gradedAssignment.findFirst({
      where: {
        assignmentSubmission: {
          studentAssignment: {
            assignmentId: assignmentId
          }
        }
      }
    });

    if (alreadyGradedAssignment) {
      return res.status(409).json({
        error: Errors.AlreadyGradedAssignment,
        data: undefined,
        success: false,
      });
    }

    const studentAssignmentGrade = await prisma.gradedAssignment.create({
      data: {
        grade,
        assignmentSubmissionId: studentAssignmentSubmission?.id as string
      }
    });

    res.status(201).json({
      error: undefined,
      data: parseForResponse(studentAssignmentGrade),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// GET all students
app.get("/students", async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    res.status(200).json({
      error: undefined,
      data: parseForResponse(students),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// GET a student by id
app.get("/students/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
    });

    if (!student) {
      return res.status(404).json({
        error: Errors.StudentNotFound,
        data: undefined,
        success: false,
      });
    }

    res.status(200).json({
      error: undefined,
      data: parseForResponse(student),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// GET assignment by id
app.get("/assignments/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }
    const assignment = await prisma.assignment.findUnique({
      include: {
        class: true,
        studentAssignments: true,
      },
      where: {
        id,
      },
    });

    if (!assignment) {
      return res.status(404).json({
        error: Errors.AssignmentNotFound,
        data: undefined,
        success: false,
      });
    }

    res.status(200).json({
      error: undefined,
      data: parseForResponse(assignment),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// GET all assignments for class
app.get("/classes/:id/assignments", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    // check if class exists
    const cls = await prisma.class.findUnique({
      where: {
        id,
      },
    });

    if (!cls) {
      return res
        .status(404)
        .json({ error: Errors.ClassNotFound, data: undefined, success: false });
    }

    const assignments = await prisma.assignment.findMany({
      where: {
        classId: id,
      },
      include: {
        class: true,
        studentAssignments: true,
      },
    });

    res.status(200).json({
      error: undefined,
      data: parseForResponse(assignments),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// GET all student submitted assignments
app.get("/student/:id/assignments", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    // check if student exists
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (!student) {
      return res.status(404).json({
        error: Errors.StudentNotFound,
        data: undefined,
        success: false,
      });
    }

    const studentAssignments = await prisma.studentAssignment.findMany({
      where: {
        studentId: id
      },
      include: {
        assignment: true,
      },
    });

    res.status(200).json({
      error: undefined,
      data: parseForResponse(studentAssignments),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// GET all student grades
app.get("/student/:id/grades", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    // check if student exists
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (!student) {
      return res.status(404).json({
        error: Errors.StudentNotFound,
        data: undefined,
        success: false,
      });
    }

    const gradedAssignments = await prisma.gradedAssignment.findMany({
      where: {
        assignmentSubmission: {
          studentAssignment: {
            studentId: id
          }
        }
      },
      include: {
        assignmentSubmission: {
          include: {
            studentAssignment: true
          }
        },
      },
    });

    res.status(200).json({
      error: undefined,
      data: parseForResponse(gradedAssignments),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export { app };
