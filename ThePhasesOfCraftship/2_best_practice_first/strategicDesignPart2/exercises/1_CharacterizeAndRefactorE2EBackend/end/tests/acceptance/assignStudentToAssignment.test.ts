import request from "supertest";
import { app } from "../../src/index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import {
  aClassRoom,
  anAssignment,
  anEnrolledStudent,
  aStudent,
  aStudentAssigment,
} from "../fixtures";
import { Assignment, Student } from "../fixtures/types";
import { StudentAssignment } from "@prisma/client";

const feature = loadFeature(
  path.join(__dirname, "../features/assignStudentToAssignment.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Assign a student to an assignment", ({
    given,
    when,
    and,
    then,
  }) => {

    let requestBody: any = {};
    let response: any = {};
    let student: Student;
    let assignment: Assignment;

    beforeAll(async () => {
      await resetDatabase();
    });

    given("There is an existing student enrolled to a class with an assignment", async () => {
      const classroomBuilder = aClassRoom().withName("Math");

      const enrollmentResult = await anEnrolledStudent()
        .from(classroomBuilder)
        .and(aStudent())
        .build();
      
      const assignmentBuildResult = await anAssignment()
        .from(classroomBuilder)
        .build();

      assignment = assignmentBuildResult.assignment;
      student = enrollmentResult.student;
    });

    when("I assign the student the assignment", async () => {
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
      expect(response.body.data.studentId).toBeTruthy();
      expect(response.body.data.assignmentId).toBeTruthy();
      expect(response.body.data.studentId).toBe(requestBody.studentId);
      expect(response.body.data.assignmentId).toBe(requestBody.assignmentId);
    });
  });

  test("Fail to assign a student to an assignment when the student is not enrolled to the class", ({
    given,
    when,
    and,
    then,
  }) => {
    let requestBody: any = {};
    let response: any = {};
    let assignment: Assignment;
    let student: Student;

    given("A student is not enrolled to a class", async () => {
      student = await aStudent().build();
    });

    and ('an assignment exists for the class', async () => {
      let builderResult = await anAssignment()
        .from(aClassRoom().withName("Math"))
        .build();
      assignment = builderResult.assignment
    })

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

  test('Already assigned the assignment to the student', ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};
    let studentAssignment: StudentAssignment;

    given('a student was already assigned an assignment', async () => {
      let classroomBuilder = await aClassRoom().withName('Math');
      studentAssignment = await aStudentAssigment()
        .from(anAssignment().from(classroomBuilder))
        .and(anEnrolledStudent()
          .from(classroomBuilder)
          .and(aStudent().withName('Khalil')))
        .build();
    });

    when('I attempt to assign the assignment to him again', async () => {
      requestBody = {
        studentId: studentAssignment.studentId,
        assignmentId: studentAssignment.assignmentId
      };

      response = await request(app)
        .post("/student-assignments")
        .send(requestBody);
    });

    then('it should fail', () => {
      expect(response.status).toBe(409);
      expect(response.body.error).toBe("AlreadyAssignedAssignmentToStudent");
    });
  });
});