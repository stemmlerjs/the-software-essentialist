import request from "supertest";
import { app } from "../../index";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { studentBuilder } from "../fixtures/classBuilder";
import { StudentBuilder } from "../fixtures";

const feature = loadFeature(
  path.join(__dirname, "../features/retrieve_student.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Successfully retrieving a student by ID", ({ given, when, then }) => {
    let student: any = {};
    let response: any = {};

    given("I have a student with a valid ID", async () => {
      student = await new StudentBuilder().build();
    });

    when("I request the student by this ID", async () => {
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

  test("Attempt to retrieve a student with a non-existent ID", ({
    when,
    then,
  }) => {
    let response: any = {};

    when("I request the student with non existent ID", async () => {
      response = await request(app).get(
        "/students/aec6817e-66b4-4ce5-8a25-f3ec459e40df"
      );
    });

    then("I should receive a 404 not found error", () => {
      expect(response.status).toBe(404);
    });
  });

  test("Attempt to retrieve a student with an invalid ID format", ({
    when,
    then,
  }) => {
    let response: any = {};

    when("I request a student with an invalid ID", async () => {
      response = await request(app).get("/students/123");
    });

    then("I should receive a 400 bad request error", () => {
      expect(response.status).toBe(400);
    });
  });
});
