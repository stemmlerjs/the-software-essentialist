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
  ClassRoom,
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

  test("Successfully retrieving submitted assignments for a student", ({
    given,
    when,
    then,
  }) => {
    let student: Student;
    let response: any = {};
    let classRoom: ClassRoom;
    let assignments: Assignment[] = [];

    given("I have a student with submitted assignments", async () => {
      ({
        classRoom: classRoom,
        students: [student],
        assignments: assignments,
      } = await new ClassRoomBuilder()
        .withStudent(new StudentBuilder())
        .withAssignmentsAssignedToAllStudentsThenSubmitted([
          new AssignmentBuilder(),
          new AssignmentBuilder(),
        ])
        .build());
    });

    when("I request all submitted assignments for this student", async () => {
      response = await request(app).get(`/student/${student.id}/assignments`);
    });

    then("I should receive all submitted assignments for that student", () => {
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(2);
      assignments.forEach((assignment: any) => {
        expect(
          response.body.data.some(
            (a: any) => a.assignment.title === assignment.title
          )
        ).toBeTruthy();
      });
    });
  });

  test("Attempt to retrieve submitted assignments for a non-existent student", ({
    when,
    then,
  }) => {
    let response: any = {};

    when(
      "I request submitted assignments for a non-existent student",
      async () => {
        response = await request(app).get(
          "/student/aec6817e-66b4-4ce5-8a25-f3ec459e40df/assignments"
        );
      }
    );

    then("I should receive an error", () => {
      expect(response.status).toBe(404);
    });
  });

  test("Attempt to retrieve submitted assignments for an invalid student", ({
    when,
    then,
  }) => {
    let response: any = {};

    when("I request submitted assignments for an invalid student", async () => {
      response = await request(app).get("/student/123/assignments");
    });

    then("I should receive an error", () => {
      expect(response.status).toBe(400);
    });
  });
});
