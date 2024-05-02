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
  Clazz,
  Assignment,
} from "../fixtures";

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
    let student: Student;
    let response: any = {};
    let clazz: Clazz;
    let assignments: Assignment[] = [];

    given("I have a student with submitted assignments", async () => {
      ({
        clazz: clazz,
        students: [student],
        assignments: assignments,
      } = await new ClassBuilder()
        .withStudent(new StudentBuilder())
        .withAssignments([new AssignmentBuilder(), new AssignmentBuilder()])
        .withAssignedAndSubmittedAssignments()
        .build());
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
        expect(response.body.data.length).toBe(2);
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
