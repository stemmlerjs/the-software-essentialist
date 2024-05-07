import request from "supertest";
import { app } from "../../index";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import {
  ClassRoomBuilder,
  AssignmentBuilder,
  StudentBuilder,
  Student,
  Assignment,
  ClassRoom,
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

  test("Successfully retrieving graded assignments for a student", ({
    given,
    when,
    then,
  }) => {
    let student: Student;
    let assignments: Assignment[] = [];
    let response: any;
    let classRoom: ClassRoom;

    given("I have a student with graded assignments", async () => {
      ({
        students: [student],
        classRoom: classRoom,
        assignments: assignments,
      } = await new ClassRoomBuilder()
        .withStudent(new StudentBuilder())
        .withAssignmentAssignedToAllStudentsThenSubmittedAndGraded([
          new AssignmentBuilder(),
          new AssignmentBuilder(),
        ])
        .build());
    });

    when("I request all graded assignments for this student", async () => {
      response = await request(app).get(`/student/${student.id}/grades`);
    });

    then("I should receive all graded assignments for that student", () => {
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(assignments.length);
      assignments.forEach((assignment: any) => {
        expect(
          response.body.data.some(
            (a: any) => a.assignment.title === assignment.title
          )
        ).toBeTruthy();
      });
    });
  });

  test("Attempt to retrieve graded assignments for a non-existent student", ({
    when,
    then,
  }) => {
    let response: any = {};

    when(
      "I request graded assignments for a non-existent student",
      async () => {
        response = await request(app).get(
          "/student/aec6817e-66b4-4ce5-8a25-f3ec459e40df/grades"
        );
      }
    );

    then("I should receive an error", () => {
      expect(response.status).toBe(404);
    });
  });

  test("Attempt to retrieve graded assignments for an invalid student", ({
    when,
    then,
  }) => {
    let response: any = {};

    when("I request graded assignments for an invalid student", async () => {
      response = await request(app).get("/student/123/grades");
    });

    then("I should receive an error", () => {
      expect(response.status).toBe(400);
    });
  });
});
