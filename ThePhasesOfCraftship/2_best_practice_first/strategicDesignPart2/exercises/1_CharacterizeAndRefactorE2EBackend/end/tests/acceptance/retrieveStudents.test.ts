import request from "supertest";
import { app } from "../../src/index";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { Student, StudentBuilder } from "../fixtures";

const feature = loadFeature(
  path.join(__dirname, "../features/retrieveStudents.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Successfully retrieving all students", ({ given, when, then }) => {
    let response: any = {};
    let students: Student[] = [];

    given("there are students registered", async () => {
      students = await Promise.all([
        new StudentBuilder().build(),
        new StudentBuilder().build(),
      ]);
    });

    when("I request all students", async () => {
      response = await request(app).get("/students");
    });

    then("I should receive a list of all students", () => {
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(students.length);
      students.forEach((student: any) => {
        expect(response.body.data).toContainEqual(
          expect.objectContaining({
            name: student.name,
            email: student.email,
          })
        );
      });
    });
  });
});
