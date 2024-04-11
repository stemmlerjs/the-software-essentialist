import express from "express";

import { prisma } from "../database";
import { isMissingKeys, isUUID, parseForResponse } from "../shared/utils";
import Errors from "../shared/constants";
import { CreateClassDTO, EnrollStudentDTO } from "../dtos/classes";
import ClassesService from "../services/classes";

const router = express.Router();

// POST class created
router.post("/", async (req, res, next) => {
  try {
    const dto = CreateClassDTO.fromRequest(req.body);
    const data = await ClassesService.createClass(dto);

    res.status(201).json({
      error: undefined,
      data: parseForResponse(data),
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

// POST student assigned to class
router.post("/enrollments", async (req, res, next) => {
  try {
    const dto = EnrollStudentDTO.fromRequest(req.body);
    const data = await ClassesService.enrollStudent(dto);

    res.status(201).json({
      error: undefined,
      data: parseForResponse(data),
      success: true,
    });
  } catch (error) {
    next(error)
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
