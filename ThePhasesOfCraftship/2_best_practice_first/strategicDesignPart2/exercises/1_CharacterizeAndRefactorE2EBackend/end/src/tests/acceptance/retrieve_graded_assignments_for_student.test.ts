import request from "supertest";
import { app } from "../../index";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import {
  ClassBuilder,
  AssignmentBuilder,
  StudentBuilder,
  Student,
  Assignment,
  Clazz,
} from "../fixtures";

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
    let student: Student;
    let assignments: Assignment[] = [];
    let response: any;
    let clazz: Clazz;

    given("I have a student with graded assignments", async () => {
      ({
        students: [student],
        clazz: clazz,
        assignments: assignments,
      } = await new ClassBuilder()
        .withStudent(new StudentBuilder())
        .withAssignment(new AssignmentBuilder())
        .withAssignment(new AssignmentBuilder())
        .withAssignedAndSubmittedAndGradedAssigments()
        .build());
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
