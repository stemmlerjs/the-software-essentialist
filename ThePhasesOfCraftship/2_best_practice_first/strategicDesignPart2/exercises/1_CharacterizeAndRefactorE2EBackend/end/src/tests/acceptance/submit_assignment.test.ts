import request from "supertest";
import { app } from "../../index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { studentAssignmentBuilder } from "../fixtures/builders";

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
    let resources: {
      student: any;
      class_: any;
      assignment: any;
      studentAssignment: any;
    } = {
      student: null,
      class_: null,
      assignment: null,
      studentAssignment: null,
    };

    given("I was assigned to an assignment", async () => {
      const { student, class_, assignment, studentAssignment } =
        await studentAssignmentBuilder();
      resources = {
        student,
        class_,
        assignment,
        studentAssignment,
      };
    });

    when("I submit the assignment", async () => {
      requestBody = {
        id: resources.studentAssignment.id,
      };

      response = await request(app)
        .post(`/student-assignments/submit`)
        .send(requestBody);
    });

    then("It should be marked as submitted", async () => {
      expect(response.status).toBe(201);
      expect(response.body.data.studentId).toBe(
        resources.studentAssignment.studentId
      );
    });
  });
});
