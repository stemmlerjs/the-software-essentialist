import request from "supertest";
import { app } from "../../index";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { studentBuilder } from "../fixtures/builders";

const feature = loadFeature(
  path.join(__dirname, "../features/retrieve_students.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Successfully retrieving all students", ({ given, when, then, and }) => {
    let response: any = {};
    let students: any = [];

    given("there are students registered", async () => {
      students = [await studentBuilder(), await studentBuilder()];
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
