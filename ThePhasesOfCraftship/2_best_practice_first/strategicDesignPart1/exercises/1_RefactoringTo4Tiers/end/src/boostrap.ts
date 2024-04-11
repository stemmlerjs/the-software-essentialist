import Application from "./application";
import Database from "./database";
import {
  AssignmentsController,
  ClassesController,
  StudentsController,
} from "./controllers";
import {
  AssignmentsService,
  ClassesService,
  StudentsService,
} from "./services";
import { errorHandler } from "./shared/errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const db = new Database(prisma);

const studentsService = new StudentsService(db);
const classesService = new ClassesService(db);
const assignmentsService = new AssignmentsService(db);

const studentsController = new StudentsController(
  studentsService,
  errorHandler
);
const classesController = new ClassesController(classesService, errorHandler);
const assignmentsController = new AssignmentsController(
  assignmentsService,
  errorHandler
);
const application = new Application(
  studentsController,
  classesController,
  assignmentsController
);

export default application;
