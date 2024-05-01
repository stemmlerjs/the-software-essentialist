import request from "supertest";
import { app } from "../../index";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { Assignment, AssignmentBuilder, ClassBuilder } from "../fixtures";

const feature = loadFeature(
  path.join(__dirname, "../features/retrieve_assignment.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Successfully retrieving an assignment by ID", ({
    given,
    when,
    then,
  }) => {
    let assignment: Assignment;
    let response: any = {};

    given("I have an assignment with a valid ID", async () => {
      ({
        assignments: [assignment],
      } = await new ClassBuilder()
        .withAssignment(new AssignmentBuilder())
        .build());
    });

    when("I request the assignment by this ID", async () => {
      response = await request(app).get(`/assignments/${assignment.id}`);
    });

    then("I should receive the assignment's details", () => {
      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe(assignment.title);
      expect(response.body.data.class).toBeDefined();
      expect(response.body.data.studentTasks).toBeDefined();
    });
  });

  test("Attempt to retrieve an assignment with a non-existent ID", ({
    when,
    then,
  }) => {
    let response: any = {};

    when("I request the assignment with non-existent ID", async () => {
      response = await request(app).get(
        "/assignments/aec6817e-66b4-4ce5-8a25-f3ec459e40df"
      );
    });

    then("I should receive a 404 not found error", () => {
      expect(response.status).toBe(404);
    });
  });

  test("Attempt to retrieve an assignment with an invalid ID format", ({
    when,
    then,
  }) => {
    let response: any = {};

    when("I request an assignment with an invalid ID", async () => {
      response = await request(app).get("/assignments/123");
    });

    then("I should receive a 400 bad request error", () => {
      expect(response.status).toBe(400);
    });
  });
});
