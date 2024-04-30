import request from "supertest";
import { app } from "../../index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import {
  AssignmentBuilder,
  ClassBuilder,
  StudentBuilder,
  assignmentBuilder,
  classBuilder,
  classEnrollmentBuilder,
  studentBuilder,
} from "../fixtures/builders";

const feature = loadFeature(
  path.join(__dirname, "../features/assign_student_to_assignment.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Assign a student to an assignment", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};
    let student: any = null;
    let class_: any = null;
    let assignment: any = null;

    beforeAll(async () => {
      // 1 class, 1 student, 1 assignment
      const classBuilder = new ClassBuilder()

      const {students, clazz, assignments } = await classBuilder.withStudent(
        new StudentBuilder()
      ).withAssignment(
        new AssignmentBuilder()
      ).build()

      student = students[0]
      class_ = clazz
      assignment = assignments[0]

    });

    given("There is a student enrolled to my class", async (name) => {
      classEnrollmentBuilder(class_.id, student.id);
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
  }) => {
    let requestBody: any = {};
    let response: any = {};
    let class_: any = null;
    let assignment: any = null;
    let student: any = null;

    given("A student is not enrolled to my class", async () => {
      class_ = await classBuilder();
      assignment = await assignmentBuilder(class_.id);
      student = await studentBuilder();
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
