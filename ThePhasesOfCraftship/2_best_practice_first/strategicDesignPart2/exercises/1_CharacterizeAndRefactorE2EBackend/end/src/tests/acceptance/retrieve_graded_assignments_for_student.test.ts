import request from "supertest";
import { app } from "../../index";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import {
  studentBuilder,
  assignmentBuilder,
  classBuilder,
  classEnrollmentBuilder,
  studentAssignmentBuilder,
  studentAssignmentSubmissionBuilder,
  gradedAssignmentBuilder,
} from "../fixtures/builders";

const feature = loadFeature(
  path.join(
    __dirname,
    "../features/retrieve_graded_assignments_for_student.feature"
  )
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Successfully retrieving graded assignments for a student by ID", ({
    given,
    when,
    then,
  }) => {
    let student: any;
    let assignments: any = [];
    let response: any;
    let class_: any = {};

    given("I have a student with graded assignments", async () => {
      student = await studentBuilder();
      class_ = await classBuilder();
      const assignment1 = await assignmentBuilder(class_.id);
      const assignment2 = await assignmentBuilder(class_.id);
      await classEnrollmentBuilder(class_.id, student.id);
      const studentAssignment1 = await studentAssignmentBuilder(
        student.id,
        assignment1.id
      );
      const studentAssignment2 = await studentAssignmentBuilder(
        student.id,
        assignment2.id
      );
      await studentAssignmentSubmissionBuilder(studentAssignment1);
      await studentAssignmentSubmissionBuilder(studentAssignment2);
      await gradedAssignmentBuilder(studentAssignment1);
      await gradedAssignmentBuilder(studentAssignment2);

      assignments.push(assignment1, assignment2);
    });

    when(
      "I request all graded assignments for this student by ID",
      async () => {
        response = await request(app).get(`/student/${student.id}/grades`);
      }
    );

    then(
      "I should receive a list of all graded assignments for that student",
      () => {
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(assignments.length);
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

  test("Attempt to retrieve graded assignments for a student with a non-existent ID", ({
    when,
    then,
  }) => {
    let response: any = {};

    when(
      "I request graded assignments for a student with a non-existent ID",
      async () => {
        response = await request(app).get(
          "/student/aec6817e-66b4-4ce5-8a25-f3ec459e40df/grades"
        );
      }
    );

    then("I should receive a 404 not found error", () => {
      expect(response.status).toBe(404);
    });
  });

  test("Attempt to retrieve graded assignments for a student with an invalid ID format", ({
    when,
    then,
  }) => {
    let response: any = {};

    when(
      "I request graded assignments for a student with an invalid ID",
      async () => {
        response = await request(app).get("/student/123/grades");
      }
    );

    then("I should receive a 400 bad request error", () => {
      expect(response.status).toBe(400);
    });
  });
});
