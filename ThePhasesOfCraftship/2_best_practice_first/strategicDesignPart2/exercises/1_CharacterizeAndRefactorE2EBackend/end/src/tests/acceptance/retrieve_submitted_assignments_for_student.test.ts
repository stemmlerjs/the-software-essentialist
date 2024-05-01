import request from "supertest";
import { app } from "../../index";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import {
  studentBuilder,
  assignmentBuilder,
  classBuilder,
  studentAssignmentBuilder,
  classEnrollmentBuilder,
  studentAssignmentSubmissionBuilder,
} from "../fixtures/builders";

const feature = loadFeature(
  path.join(
    __dirname,
    "../features/retrieve_submitted_assignments_for_student.feature"
  )
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Successfully retrieving submitted assignments for a student by ID", ({
    given,
    when,
    then,
  }) => {
    let student: any = {};
    let response: any = {};
    let class_: any = {};
    let studentAssignments: any = [];
    let assignments: any = [];

    given("I have a student with submitted assignments", async () => {
      student = await studentBuilder();
      class_ = await classBuilder();
      const assignment1 = await assignmentBuilder(class_.id);
      const assignment2 = await assignmentBuilder(class_.id);
      assignments.push(assignment1, assignment2);
      await classEnrollmentBuilder(class_.id, student.id);
      const studentAssignment1 = await studentAssignmentBuilder({
        studentId: student.id,
        assignmentId: assignment1.id,
      });
      const studentAssignment2 = await studentAssignmentBuilder({
        studentId: student.id,
        assignmentId: assignment2.id,
      });
      await studentAssignmentSubmissionBuilder({
        assignmentId: assignment1.id,
        studentId: student.id,
      });
      await studentAssignmentSubmissionBuilder({
        assignmentId: assignment2.id,
        studentId: student.id,
      });
      studentAssignments.push(studentAssignment1, studentAssignment2);
    });

    when(
      "I request all submitted assignments for this student by ID",
      async () => {
        response = await request(app).get(`/student/${student.id}/assignments`);
      }
    );

    then(
      "I should receive a list of all submitted assignments for that student",
      () => {
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(studentAssignments.length);
        assignments.forEach((assignment: any) => {
          expect(
            response.body.data.some(
              (a: any) => a.assignment.title === assignment.title
            )
          ).toBeTruthy();
        });
      }
    );
  });

  test("Attempt to retrieve submitted assignments for a student with a non-existent ID", ({
    when,
    then,
  }) => {
    let response: any = {};

    when(
      "I request submitted assignments for a student with non-existent ID",
      async () => {
        response = await request(app).get(
          "/student/aec6817e-66b4-4ce5-8a25-f3ec459e40df/assignments"
        );
      }
    );

    then("I should receive a 404 not found error", () => {
      expect(response.status).toBe(404);
    });
  });

  test("Attempt to retrieve submitted assignments for a student with an invalid ID format", ({
    when,
    then,
  }) => {
    let response: any = {};

    when(
      "I request submitted assignments for a student with an invalid ID",
      async () => {
        response = await request(app).get("/student/123/assignments");
      }
    );

    then("I should receive a 400 bad request error", () => {
      expect(response.status).toBe(400);
    });
  });
});
