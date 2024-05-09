import request from "supertest";
import { app } from "../../src/index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { ClassRoomBuilder, StudentBuilder } from "../fixtures";

const feature = loadFeature(
  path.join(__dirname, "../features/enroll_student_to_class.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Successfully enroll a student to a class", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};

    given("there is a class and a student", async () => {
      const { classRoom } = await new ClassRoomBuilder().build();
      const student = await new StudentBuilder().build();

      requestBody = {
        studentId: student.id,
        classId: classRoom.id,
      };
    });

    when("I enroll the student to the class", async () => {
      response = await request(app)
        .post("/class-enrollments")
        .send(requestBody);
    });

    then("the student should be enrolled to the class successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body.data.studentName).toBe(requestBody.studentName);
      expect(response.body.data.className).toBe(requestBody.className);
    });
  });

  test("Enroll a student to a class that doesn't exist", ({
    given,
    when,
    then,
  }) => {
    let requestBody: any = {};
    let response: any = {};

    given("there is a student", async () => {
      const student = await new StudentBuilder().build();
      requestBody = {
        studentId: student.id,
        ...requestBody,
      };
    });

    when("I enroll the student to a class that doesn't exist", async () => {
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
  });
});
