import request from "supertest";
import { app } from "../../src/index";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import {
  anAssignmentSubmission,
  aStudentAssigment,
  anEnrolledStudent,
  anAssignment,
  aStudent,
  aClassRoom,
} from "../fixtures";
import { AssignmentSubmission } from "@prisma/client";

const feature = loadFeature(
  path.join(
    __dirname,
    "../features/retrieveSubmittedAssignmentsForStudent.feature"
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
    let response: any = {};
    let submissions: AssignmentSubmission[] = [];
    let studentId: string;

    given("I have a student with submitted assignments", async () => {
      let classroomBuilder = aClassRoom();
      let studentBuilder = aStudent();

      let submissionOne = await anAssignmentSubmission()
        .from(
          aStudentAssigment()
            .and(
              anEnrolledStudent()
                .and(studentBuilder)
                .from(classroomBuilder)
            )
            .from(anAssignment().from(classroomBuilder))
        )
        .build()

        let submissionTwo = await anAssignmentSubmission()
          .from(
            aStudentAssigment()
              .and(
                anEnrolledStudent()
                  .and(studentBuilder)
                  .from(classroomBuilder)
              )
              .from(anAssignment().from(classroomBuilder))
          )
          .build();
        
        studentId = submissionOne.studentAssignment.studentId
        submissions = [submissionOne.assignmentSubmission, submissionTwo.assignmentSubmission];
    });

    when("I request all submitted assignments for this student", async () => {
      response = await request(app).get(`/student/${studentId}/assignments`);
    });

    then("I should receive all submitted assignments for that student", () => {
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(submissions.length);
      
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
