import request from "supertest";
import { app } from "../../src/index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import {
  aClassRoom,
  aGradedAssignment,
  anAssignment,
  anAssignmentSubmission,
  anEnrolledStudent,
  aStudent,
  aStudentAssigment,
} from "../fixtures";
import { AssignmentSubmission, StudentAssignment } from "@prisma/client";

const feature = loadFeature(
  path.join(__dirname, "../features/gradeAssignment.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Successfully grade an assignment", ({ given, when, then }) => {

    let requestBody: any = {};
    let response: any = {};
    let assignmentSubmission: AssignmentSubmission;
    let studentAssignment: StudentAssignment;

    given("An student submited an assignment", async () => {
      const classroomBuilder = aClassRoom()
      const response = await anAssignmentSubmission()
        .from(aStudentAssigment().from(anAssignment().from(classroomBuilder)).and(anEnrolledStudent().and(aStudent()).from(classroomBuilder)))
        .build();
      assignmentSubmission = response.assignmentSubmission;
      studentAssignment = response.studentAssignment
    });

    when("I grade the assignment", async () => {
      requestBody = {
        studentId: studentAssignment.studentId,
        assignmentId: studentAssignment.assignmentId,
        grade: "A",
      };

      response = await request(app)
        .post(`/student-assignments/grade`)
        .send(requestBody);
    });

    then("It should be marked as graded", async () => {
      expect(response.status).toBe(201);
      expect(response.body.data.grade).toBe("A");
    });
  });

  test("Fail to grade an assignment when it is not submitted", ({
    given,
    when,
    then,
  }) => {

    let requestBody: any = {};
    let response: any = {};
    let studentAssignment: StudentAssignment;

    given("A student hasn't yet submitted his assignment", async () => {
      const classroomBuilder = aClassRoom();
      studentAssignment = await aStudentAssigment()
        .from(anAssignment().from(classroomBuilder))
        .and(anEnrolledStudent().from(classroomBuilder).and(aStudent()))
        .build()
    })
    
    when("I try to grade his assignment before he submits it", async () => {
      requestBody = {
        studentId: studentAssignment.studentId,
        assignmentId: studentAssignment.assignmentId,
        grade: "A",
      };

      response = await request(app)
        .post(`/student-assignments/grade`)
        .send(requestBody);
    });

    then("It should not be marked as graded", async () => {
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("NotSubmittedError");
    });
  });

  test('Should fail to re-grade an already graded assignment', ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};
    let studentId: string;
    let assignmentId: string;
    
    given('a submitted assignment has already been graded', async () => {
      let classRoomBuilder = await aClassRoom().withName('Math');

      let builderResult = await aGradedAssignment()
      .from(
        anAssignmentSubmission()
          .from(
            aStudentAssigment()
              .from(anAssignment().from(classRoomBuilder))
              .and(
                anEnrolledStudent()
                  .from(classRoomBuilder)
                  .and(aStudent())
              )
          )
      )
      .withGrade('A')
      .build()
      
        studentId = builderResult.submission.studentAssignment.studentId;
        assignmentId = builderResult.submission.studentAssignment.assignmentId;
    });

    when('I try to re-grade the assignment', async () => {
      requestBody = {
        studentId: studentId,
        assignmentId: assignmentId,
        grade: "F",
      };

      response = await request(app)
        .post(`/student-assignments/grade`)
        .send(requestBody);
    });

    then('it should fail', () => {
      expect(response.status).toBe(409);
      expect(response.body.error).toBe("AlreadyGradedAssignment");
    });
  });
});
