import request from "supertest";
import { app } from "../../src/index";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { aClassRoom, anAssignment } from "../fixtures";
import { Assignment } from "@prisma/client";

const feature = loadFeature(
  path.join(__dirname, "../features/retrieveAssignment.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Successfully retrieving an assignment", ({ given, when, then }) => {
    let assignment: Assignment;
    let response: any = {};

    given("I have a valid assignment", async () => {
      let builderResult = await anAssignment()
        .from(aClassRoom())
        .build();
      assignment = builderResult.assignment;
    });

    when("I request the assignment", async () => {
      response = await request(app).get(`/assignments/${assignment.id}`);
    });

    then("I should receive the assignment's details", () => {
      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe(assignment.title);
      expect(response.body.data.class).toBeDefined();
      expect(response.body.data.studentAssignments).toBeDefined();
    });
  });

  test("Attempt to retrieve a non-existent assignment", ({ when, then }) => {
    let response: any = {};

    when("I request the assignment", async () => {
      response = await request(app).get(
        "/assignments/aec6817e-66b4-4ce5-8a25-f3ec459e40df"
      );
    });

    then("I should receive an error", () => {
      expect(response.status).toBe(404);
    });
  });

  test("Attempt to retrieve an invalid assignment", ({ when, then }) => {
    let response: any = {};

    when("I request an invalid assignment", async () => {
      response = await request(app).get("/assignments/123");
    });

    then("I should receive an error", () => {
      expect(response.status).toBe(400);
    });
  });
});
