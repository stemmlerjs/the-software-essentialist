import request from "supertest";
import { app } from "../../src/index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { aClassRoom, anEnrolledStudent, aStudent, EnrolledStudent } from "../fixtures";
import { Class, Student } from "@prisma/client";

const feature = loadFeature(
  path.join(__dirname, "../features/createEnrollment.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  let student: Student;
  let classroom: Class;

  test("Successfully enroll a student to a class", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};

    given("there is a class and a student", async () => {
      classroom = await aClassRoom().build();
      student = await aStudent().build();

      requestBody = {
        studentId: student.id,
        classId: classroom.id,
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
      student = await aStudent().build();

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

  test('Already enrolled', ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};
    let enrolledStudent: EnrolledStudent;
    let classroom: Class;

    given('a student is already enrolled to a class', async () => {
      let builderResult = await anEnrolledStudent()
        .from(aClassRoom().withName('Math'))
        .and(aStudent().withEmail('khalil@essentialist.dev').withName('Khalil'))
        .build();
      enrolledStudent = builderResult.enrolledStudent;
      classroom = builderResult.classRoom;
    });

    when('I enroll the student to the class again', async () => {
      requestBody = {
        classId: classroom.id,
        studentId: enrolledStudent.studentId
      };

      response = await request(app)
        .post("/class-enrollments")
        .send(requestBody);
    });

    then('I should see an error message', () => {
      expect(response.status).toBe(409);
      expect(response.body.error).toBe("StudentAlreadyEnrolled");
    });
  });
});
