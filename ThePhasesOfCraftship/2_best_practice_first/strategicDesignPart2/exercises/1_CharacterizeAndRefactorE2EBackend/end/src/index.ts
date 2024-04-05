import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.post("/students", async (req: express.Request, res: express.Response) => {
  try {
    const { name, email } = req.body;
    const student = await prisma.student.create({
      data: { name, email },
    });
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Assign student to class
app.post("/students/:studentId/classes/:classId", async (req, res) => {
  try {
    const { studentId, classId } = req.body;
    const student = await prisma.student.update({
      where: { id: studentId },
      data: {
        classes: { connect: { id: classId } },
      },
    });
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// create class
app.post("/classes", async (req, res) => {
  try {
    const { name } = req.body;
    const classs = await prisma.class.create({
      data: { name },
    });
    res.json(classs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Assignment created
app.post("/assignments", async (req, res) => {
  try {
    const { name, classId } = req.body;
    const assignment = await prisma.assignment.create({
      data: { name, classId },
    });
    res.json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// student assigned assignment
app.post(
  "students/:studentId/assignments/:assignmentId/assign",
  async (req, res) => {
    try {
      const { studentId, assignmentId } = req.body;
      const studentAssignment = await prisma.studentAssignment.create({
        data: { studentId, assignmentId },
      });
      res.json(studentAssignment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Submit assignment
app.post(
  "students/:studentId/assignments/:assignmentId/submit",
  async (req, res) => {
    try {
      const { studentAssignmentId, submission } = req.body;
      const studentAssignmentSubmission =
        await prisma.studentAssignmentSubmission.create({
          data: { studentAssignmentId, submission },
        });
      res.json(studentAssignmentSubmission);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Assignment graded
app.post(
  "students/:studentId/assignments/:assignmentId/grade",
  async (req, res) => {
    try {
      const { grade, assignmentSubmissionId } = req.body;
      const studentAssignment =
        await prisma.studentAssignmentSubmissionGrade.create({
          data: { grade, assignmentSubmissionId: assignmentSubmissionId },
        });
      res.json(studentAssignment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
