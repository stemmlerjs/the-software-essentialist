import request from "supertest";
import { app } from "../../index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import {
  assignmentBuilder,
  classBuilder,
  classEnrollmentBuilder,
  studentAssignmentBuilder,
  studentAssignmentSubmissionBuilder,
  studentBuilder,
} from "../fixtures/builders";

const feature = loadFeature(
  path.join(__dirname, "../features/grade_assignment.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  let requestBody: any = {};
  let response: any = {};
  let student: any = null;
  let class_: any = null;
  let assignment: any = null;
  let studentAssignment: any = null;

  beforeEach(async () => {
    student = await studentBuilder();
    class_ = await classBuilder();
    assignment = await assignmentBuilder(class_.id);
    await classEnrollmentBuilder(class_.id, student.id);
    studentAssignment = await studentAssignmentBuilder(
      student.id,
      assignment.id
    );
  });

  test("Successfully grade an assignment", ({ given, when, then }) => {
    given("An student submited an assignment", async () => {
      await studentAssignmentSubmissionBuilder(studentAssignment.id);
    });

    when("I grade the assignment", async () => {
      requestBody = {
        id: studentAssignment.id,
        grade: "A",
      };

      response = await request(app)
        .post(`/student-assignments/grade`)
        .send(requestBody);
    });

    then("It should be marked as graded", async () => {
      expect(response.status).toBe(201);
      expect(response.body.data.grade).toBe("A");
    });
  });

  test("Fail to grade an assignment when it is not submitted", ({
    given,
    when,
    then,
  }) => {
    given("A student is assigned to an assignment", async () => {
      studentAssignment = await studentAssignmentBuilder(
        student.id,
        assignment.id
      );
    });

    when("I try to grade his assignment before he submits it", async () => {
      requestBody = {
        id: studentAssignment.id,
        grade: "A",
      };

      response = await request(app)
        .post(`/student-assignments/grade`)
        .send(requestBody);
    });

    then("It should not be marked as graded", async () => {
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("NotSubmittedError");
    });
  });
});
