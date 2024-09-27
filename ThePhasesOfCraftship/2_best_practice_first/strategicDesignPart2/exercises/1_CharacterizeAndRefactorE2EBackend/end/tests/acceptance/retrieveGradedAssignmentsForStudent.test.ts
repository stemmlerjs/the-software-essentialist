import request from "supertest";
import { app } from "../../src/index";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import {
  AssignmentBuilder,
  StudentBuilder,
  Student,
  Assignment,
  ClassRoom,
  aStudent,
  aGradedAssignment,
  aStudentAssigment,
  anAssignmentSubmission,
  anEnrolledStudent,
  EnrolledStudent,
  anAssignment,
  aClassRoom,
} from "../fixtures";
import { GradedAssignment } from "@prisma/client";

const feature = loadFeature(
  path.join(
    __dirname,
    "../features/retrieveGradedAssignmentsForStudent.feature"
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
    let studentId: string;
    let response: any;
    let gradedAssignments: GradedAssignment[] = []

    given("I have a student with graded assignments", async () => {
      // Common
      let classroomBuilder = aClassRoom().withName('Math')
      let enrolledStudentBuilder = anEnrolledStudent()
        .from(classroomBuilder)
        .and(aStudent().withName('Khalil').withEmail('khalil@essentialist.dev'))
      let assignmentBuilder = anAssignment().from(classroomBuilder).withTitle('Calculus Refresher')
      
      let gradedAssignmentResponseOne = await aGradedAssignment()
        .from(anAssignmentSubmission()
        .from(aStudentAssigment()
        .from(assignmentBuilder)
        .and(enrolledStudentBuilder)))
        .withGrade('A')
        .build();

      let gradedAssignmentResponseTwo = await aGradedAssignment()
        .from(anAssignmentSubmission()
        .from(aStudentAssigment()
        .from(assignmentBuilder)
        .and(enrolledStudentBuilder)))
        .withGrade('B')
        .build();
   

      gradedAssignments = [
        gradedAssignmentResponseOne.gradedAssignment, 
        gradedAssignmentResponseTwo.gradedAssignment
      ];

      studentId = gradedAssignmentResponseOne.submission.studentAssignment.studentId
    });

    when("I request all graded assignments for this student", async () => {
      response = await request(app).get(`/student/${studentId}/grades`);
    });

    then("I should receive all graded assignments for that student", () => {
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(gradedAssignments.length);
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
