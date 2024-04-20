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

  test("Successfully grade an assignment", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};
    let student: any = null;
    let class_: any = null;
    let assignment: any = null;
    let studentAssignment: any = null;

    beforeAll(async () => {
      student = await studentBuilder();
      class_ = await classBuilder();
      assignment = await assignmentBuilder(class_.id);
      await classEnrollmentBuilder(class_.id, student.id);
      studentAssignment = await studentAssignmentBuilder(
        student.id,
        assignment.id
      );
    });

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
});
