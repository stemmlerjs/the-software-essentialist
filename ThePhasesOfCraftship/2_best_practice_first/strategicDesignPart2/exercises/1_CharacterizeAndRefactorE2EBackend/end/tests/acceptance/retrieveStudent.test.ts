import request from "supertest";
import { app } from "../../src/index";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { Student, StudentBuilder } from "../fixtures";

const feature = loadFeature(
  path.join(__dirname, "../features/retrieveStudent.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Successfully retrieving a student", ({ given, when, then }) => {
    let student: Student;
    let response: any = {};

    given("I have a valid student", async () => {
      student = await new StudentBuilder().build();
    });

    when("I request the student", async () => {
      response = await request(app).get(`/students/${student.id}`);
    });

    then("I should receive the student's details", () => {
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(
        expect.objectContaining({
          name: student.name,
          email: student.email,
        })
      );
    });
  });

  test("Attempt to retrieve a non-existent student", ({ when, then }) => {
    let response: any = {};

    when("I request the student", async () => {
      response = await request(app).get(
        "/students/aec6817e-66b4-4ce5-8a25-f3ec459e40df"
      );
    });

    then("I should receive an error", () => {
      expect(response.status).toBe(404);
    });
  });

  test("Attempt to retrieve an invalid student", ({ when, then }) => {
    let response: any = {};

    when("I request an invalid student", async () => {
      response = await request(app).get("/students/123");
    });

    then("I should receive an error", () => {
      expect(response.status).toBe(400);
    });
  });
});
