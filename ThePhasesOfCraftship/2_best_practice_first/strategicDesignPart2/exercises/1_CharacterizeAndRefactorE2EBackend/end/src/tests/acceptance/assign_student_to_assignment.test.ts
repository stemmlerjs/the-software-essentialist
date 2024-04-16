import request from "supertest";
import { app } from "../../index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { prisma } from "../../database";

const feature = loadFeature(
  path.join(__dirname, "../features/assign_student_to_assignment.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Assign a student to an assignment", ({ given, when, then, and }) => {
    let requestBody: any = {};
    let response: any = {};
    let class_: any = null;
    let assignment: any = null;
    let student: any = null;

    given(/^I give a class named "(.*)"$/, async (name) => {
      class_ = await prisma.class.create({
        data: {
          name,
        },
      });
    });

    and(/^I create an assignment named "(.*)"$/, async (title) => {
      assignment = await prisma.assignment.create({
        data: {
          title,
          classId: class_.id,
        },
      });
    });

    and("There is a student enrolled to the class", async () => {
      student = await prisma.student.create({
        data: {
          name: "Student Name",
          email: "student@essentialist.dev",
        },
      });

      await prisma.classEnrollment.create({
        data: {
          classId: class_.id,
          studentId: student.id,
        },
      });
    });

    when("I assign him to the assignment", async () => {
      requestBody = {
        studentId: student.id,
        assignmentId: assignment.id,
      };

      response = await request(app)
        .post("/student-assignments")
        .send(requestBody);
    });

    then("the student should be assigned to the assignment", () => {
      expect(response.status).toBe(201);
      expect(response.body.data.studentId).toBe(requestBody.studentId);
      expect(response.body.data.assignmentId).toBe(requestBody.assignmentId);
    });
  });

  test("Fail to assign a student to an assignment when the student is not enrolled to the class", ({
    given,
    when,
    then,
    and,
  }) => {
    let requestBody: any = {};
    let response: any = {};
    let class_: any = null;
    let assignment: any = null;
    let student: any = null;

    given(/^I give a class named "(.*)"$/, async (name) => {
      class_ = await prisma.class.create({
        data: {
          name,
        },
      });
    });

    and(/^I create an assignment named "(.*)"$/, async (title) => {
      assignment = await prisma.assignment.create({
        data: {
          title,
          classId: class_.id,
        },
      });
    });

    and("There is a student not enrolled to the class", async () => {
      student = await prisma.student.create({
        data: {
          name: "Student Name",
          email: "student@essentialist.dev",
        },
      });
    });

    when("I assign him to the assignment", async () => {
      requestBody = {
        studentId: student.id,
        assignmentId: assignment.id,
      };

      response = await request(app)
        .post("/student-assignments")
        .send(requestBody);
    });

    then("the student should not be assigned to the assignment", () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("StudentNotEnrolled");
    });
  });
});
