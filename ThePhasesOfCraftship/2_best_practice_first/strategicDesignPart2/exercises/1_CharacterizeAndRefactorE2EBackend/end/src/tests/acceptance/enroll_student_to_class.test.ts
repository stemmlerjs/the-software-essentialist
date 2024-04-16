import request from "supertest";
import { app } from "../../index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { prisma } from "../../database";

const feature = loadFeature(
  path.join(__dirname, "../features/enroll_student_to_class.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Successfully enroll a student to a class", ({
    given,
    and,
    when,
    then,
  }) => {
    let requestBody: any = {};
    let response: any = {};

    given("there is a student with the data below", async (table) => {
      const { Name, Email } = table[0];
      const student = await prisma.student.create({
        data: {
          name: Name,
          email: Email,
        },
      });

      requestBody = {
        studentId: student.id,
        ...requestBody,
      };
    });

    and(/^there is a "(.*)" class$/, async (className) => {
      const class_ = await prisma.class.create({
        data: {
          name: className,
        },
      });

      requestBody = {
        classId: class_.id,
        ...requestBody,
      };
    });

    when("I request to enroll the student to the class", async () => {
      response = await request(app)
        .post("/class-enrollments")
        .send(requestBody);

      const data = await prisma.student.findUnique({
        where: {
          id: requestBody.studentId,
        },
        include: {
          classes: true,
        },
      });
    });

    then("the student should be enrolled to the class successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body.data.studentName).toBe(requestBody.studentName);
      expect(response.body.data.className).toBe(requestBody.className);
    });
  });

  test("Enroll a student to a class that doesn't exist", ({given, when, then}) => {
    let requestBody: any = {};
    let response: any = {};

    given("there is a student with the data below", async (table) => {
      const { Name, Email } = table[0];
      const student = await prisma.student.create({
        data: {
          name: Name,
          email: Email,
        },
      });

      requestBody = {
        studentId: student.id,
        ...requestBody,
      };
    });

    when("I request to enroll the student to a class that doesn't exist", async () => {
      requestBody = {
        classId: "72463da6-3f58-4d82-b5e8-800c6f30d8a0",
        ...requestBody,
      };

      response = await request(app)
        .post("/class-enrollments")
        .send(requestBody);
    });



    then("the student should not be enrolled to the class", () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("ClassNotFound");
    });
  })
});
