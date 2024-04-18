import request from "supertest";
import { app } from "../../index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import {
  assignmentBuilder,
  classBuilder,
  studentAssignmentBuilder,
  studentBuilder,
} from "../fixtures/builders";

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
    let student: any = null;
    let class_: any = null;
    let assignment: any = null;
    let studentAssignment: any = null;

    beforeAll(async () => {
      student = await studentBuilder();
      class_ = await classBuilder();
      assignment = await assignmentBuilder(class_.id);
    });

    given("I was assigned to an assignment", async () => {
      studentAssignment = await studentAssignmentBuilder(
        student.id,
        assignment.id
      );
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
