import request from "supertest";
import { app } from "../../src/index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import {
  AssignmentBuilder,
  ClassRoomBuilder,
  StudentBuilder,
} from "../fixtures";
import { Assignment, ClassRoom, Student } from "../fixtures/types";

const feature = loadFeature(
  path.join(__dirname, "../features/assignStudentToAssignment.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Assign a student to an assignment", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};
    let student: Student;
    let assignment: Assignment;

    let classBuilder: ClassRoomBuilder = new ClassRoomBuilder();

    beforeAll(async () => {
      ({
        assignments: [assignment],
      } = await classBuilder.withAssignment(new AssignmentBuilder()).build());
    });

    given("There is a student enrolled to my class", async () => {
      student = await classBuilder.enrollStudent(new StudentBuilder());
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
    let assignment: any = null;
    let student: any = null;
    let classBuilder: ClassRoomBuilder = new ClassRoomBuilder();

    given("A student is not enrolled to my class", async () => {
      ({
        assignments: [assignment],
      } = await classBuilder.withAssignment(new AssignmentBuilder()).build());

      student = await new StudentBuilder().build();
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
