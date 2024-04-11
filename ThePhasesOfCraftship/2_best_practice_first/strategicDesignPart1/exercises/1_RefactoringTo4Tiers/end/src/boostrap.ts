import Application from "./application";
import { ClassesController, StudentsController } from "./controllers";
import Database from "./database";
import ClassesService from "./services/classes";
import StudentsService from "./services/students";
import { errorHandler } from "./shared/errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const db = new Database(prisma);

const studentsService = new StudentsService(db);
const classesService = new ClassesService(db);

const studentsController = new StudentsController(
  studentsService,
  errorHandler
);
const classesController = new ClassesController(classesService, errorHandler);
const application = new Application(studentsController, classesController);

export default application;
