import request from "supertest";
import { app } from "../../index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { prisma } from "../../database";

const feature = loadFeature(
  path.join(__dirname, "../features/submit_assignment.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Successfully submit an assignment", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};
    let student: any = {};
    let class_: any = {};
    let assignment: any = {};
    let studentAssignment: any = {};

    beforeAll(async () => {
      student = await prisma.student.create({
        data: {
          name: "John Doe",
          email: "johndoe@essentialist.dev",
        },
      });

      class_ = await prisma.class.create({
        data: {
          name: "Math",
        },
      });

      assignment = await prisma.assignment.create({
        data: {
          title: "Math Assignment",
          classId: class_.id,
        },
      });

      await prisma.classEnrollment.create({
        data: {
          classId: class_.id,
          studentId: student.id,
        },
      });
    });

    given("I was assigned to an assignment", async () => {
      studentAssignment = await prisma.studentAssignment.create({
        data: {
          studentId: student.id,
          assignmentId: assignment.id,
        },
      });
    });

    when("I submit the assignment", async () => {
      requestBody = {
        id: studentAssignment.id,
      };

      response = await request(app)
        .post(`/student-assignments/submit`)
        .send(requestBody);
    });

    then("It should be marked as submitted", async () => {
      expect(response.status).toBe(201);
      expect(response.body.data.studentId).toBe(studentAssignment.studentId);
    });
  });
});
