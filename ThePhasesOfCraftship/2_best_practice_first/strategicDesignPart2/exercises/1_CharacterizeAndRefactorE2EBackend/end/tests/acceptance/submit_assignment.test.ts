import request from "supertest";
import { app } from "../../src/index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import {
  ClassRoomBuilder,
  AssignmentBuilder,
  StudentBuilder,
  Student,
  Assignment,
} from "../fixtures";

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
    let student: Student;
    let assignment: Assignment;
    let studentBuilder: StudentBuilder;

    beforeAll(async () => {
      studentBuilder = new StudentBuilder();
      ({
        students: [student],
        assignments: [assignment],
      } = await new ClassRoomBuilder()
        .withStudent(studentBuilder)
        .withAssignment(new AssignmentBuilder())
        .build());
    });

    given("I was assigned to an assignment", async () => {
      await studentBuilder.assignAssignment(assignment.id);
    });

    when("I submit the assignment", async () => {
      requestBody = {
        studentId: student.id,
        assignmentId: assignment.id,
      };

      response = await request(app)
        .post(`/student-assignments/submit`)
        .send(requestBody);
    });

    then("It should be marked as submitted", async () => {
      expect(response.status).toBe(201);
      expect(response.body.data.status).toBe("submitted");
    });
  });

  test("Fail to submit an assignment twice", ({ given, when, then, and }) => {
    let requestBody: any = {};
    let response: any = {};
    let student: Student;
    let assignment: Assignment;
    let studentBuilder: StudentBuilder;

    beforeEach(async () => {
      studentBuilder = new StudentBuilder();
      ({
        students: [student],
        assignments: [assignment],
      } = await new ClassRoomBuilder()
        .withStudent(studentBuilder)
        .withAssignment(new AssignmentBuilder())
        .withAssignedAssignments()
        .build());
    });

    given("I submitted the assignment", async () => {
      await studentBuilder.submitAssignment(assignment.id);
    });

    when("I submit the assignment again", async () => {
      requestBody = {
        studentId: student.id,
        assignmentId: assignment.id,
      };

      response = await request(app)
        .post(`/student-assignments/submit`)
        .send(requestBody);
    });

    then("I should see an error message", async () => {
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("AssignmentAlreadySubmitted");
    });
  });
});
