import request from "supertest";
import { app } from "../../src/index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import {
  aClassRoom,
  anAssignmentSubmission,
  anEnrolledStudent,
  aStudentAssigment,
} from "../fixtures";
import { AssignmentSubmission, StudentAssignment } from "@prisma/client";

const feature = loadFeature(
  path.join(__dirname, "../features/submitAssignment.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Successfully submit an assignment", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};
    let studentAssignment: StudentAssignment;

    beforeEach(async () => {
      await resetDatabase();
    });

    given("I was assigned an assignment", async () => {
      studentAssignment = await aStudentAssigment()
        .build()
    });

    when("I submit my assignment", async () => {
      requestBody = {
        studentId: studentAssignment.studentId,
        assignmentId: studentAssignment.assignmentId
      };

      response = await request(app)
        .post(`/student-assignments/submit`)
        .send(requestBody);
    });

    then("it should be successfully submitted", async () => {
      expect(response.status).toBe(201);
    });
  });

  test("Submitting assignments multiple times", ({ given, when, then, and }) => {
    let requestBody: any = {};
    let response: any = {};
    let assignmentSubmission: AssignmentSubmission;
    let studentAssignment: StudentAssignment;

    beforeEach(async () => {
      await resetDatabase();
    });

    given("I have already submitted my assignment", async () => {
      const response = await anAssignmentSubmission()
        .from(aStudentAssigment().from(anEnrolledStudent().from(aClassRoom().withName('Math'))))
        .build()

      assignmentSubmission = response.assignmentSubmission;
      studentAssignment = response.studentAssignment;
    });

    when("I submit my assignment again", async () => {
      requestBody = {
        studentId: studentAssignment.studentId,
        assignmentId: studentAssignment.assignmentId,
      };

      response = await request(app)
        .post(`/student-assignments/submit`)
        .send(requestBody);
    });

    then("I should see an error message", async () => {
      expect(response.status).toBe(409);
      expect(response.body.error).toBe("AssignmentAlreadySubmitted");
    });
  });
});
