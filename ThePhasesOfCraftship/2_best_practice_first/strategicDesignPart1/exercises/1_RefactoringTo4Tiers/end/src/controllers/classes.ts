import express from "express";

import { prisma } from "../database";
import { isMissingKeys, isUUID, parseForResponse } from "../shared/utils";
import Errors from "../shared/constants";

const router = express.Router();

// POST class created
router.post("/classes", async (req, res) => {
  try {
    if (isMissingKeys(req.body, ["name"])) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    const { name } = req.body;

    const cls = await prisma.class.create({
      data: {
        name,
      },
    });

    res.status(201).json({
      error: undefined,
      data: parseForResponse(cls),
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: Errors.ServerError,
      data: undefined,
      success: false,
    });
  }
});

// POST student assigned to class
router.post("/enrollments", async (req, res) => {
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
      return res.status(400).json({
        error: Errors.StudentAlreadyEnrolled,
        data: undefined,
        success: false,
      });
    }

    if (!cls) {
      return res.status(404).json({
        error: Errors.ClassNotFound,
        data: undefined,
        success: false,
      });
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
    res.status(500).json({
      error: Errors.ServerError,
      data: undefined,
      success: false,
    });
  }
});

// GET all assignments for class
router.get("/:id/assignments", async (req, res) => {
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
      return res.status(404).json({
        error: Errors.ClassNotFound,
        data: undefined,
        success: false,
      });
    }

    const assignments = await prisma.assignment.findMany({
      where: {
        classId: id,
      },
      include: {
        class: true,
        studentTasks: true,
      },
    });

    res.status(200).json({
      error: undefined,
      data: parseForResponse(assignments),
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: Errors.ServerError,
      data: undefined,
      success: false,
    });
  }
});

export default router;
