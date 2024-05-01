import request from "supertest";
import { app } from "../../index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import {
  AssignmentBuilder,
  ClassBuilder,
  StudentBuilder,
  studentAssignmentSubmissionBuilder,
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
  let assignment: any = null;
  let classBuilder: ClassBuilder = new ClassBuilder();

  beforeEach(async () => {
    // 1 class, 1 student, 1 assignment, 1 enrollment
    ({
      students: [student],
      assignments: [assignment],
    } = await classBuilder
      .withAssignment(new AssignmentBuilder())
      .withStudent(new StudentBuilder())
      .withAssignedAssignments()
      .build());
  });

  test("Successfully grade an assignment", ({ given, when, then }) => {
    given("An student submited an assignment", async () => {
      await studentAssignmentSubmissionBuilder({
        studentId: student.id,
        assignmentId: assignment.id,
      });
    });

    when("I grade the assignment", async () => {
      requestBody = {
        studentId: student.id,
        assignmentId: assignment.id,
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
    when,
    then,
  }) => {
    when("I try to grade his assignment before he submits it", async () => {
      requestBody = {
        studentId: student.id,
        assignmentId: assignment.id,
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
