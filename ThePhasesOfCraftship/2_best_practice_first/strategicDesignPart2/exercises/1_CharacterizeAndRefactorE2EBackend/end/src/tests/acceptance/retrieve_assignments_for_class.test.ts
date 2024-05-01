import request from "supertest";
import { app } from "../../index";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { ClassBuilder, AssignmentBuilder } from "../fixtures/builders";

const feature = loadFeature(
  path.join(__dirname, "../features/retrieve_assignments_for_class.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Successfully retrieving assignments for a class by ID", ({
    given,
    when,
    then,
  }) => {
    let classId: string = "";
    let assignments: any = [];
    let response: any = {};

    given("I have a class with assignments", async () => {
      const { clazz, assignments: assignments_ } = await new ClassBuilder()
        .withAssignment(new AssignmentBuilder())
        .withAssignment(new AssignmentBuilder())
        .build();
      classId = clazz.id;
      assignments = assignments_;
    });

    when("I request all assignments for this class by ID", async () => {
      response = await request(app).get(`/classes/${classId}/assignments`);
    });

    then("I should receive a list of all assignments for that class", () => {
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(assignments.length);
      assignments.forEach((assignment: any) => {
        expect(
          response.body.data.some((a: any) => a.title === assignment.title)
        ).toBeTruthy();
      });
    });
  });

  test("Attempt to retrieve assignments for a class with a non-existent ID", ({
    when,
    then,
  }) => {
    let response: any = {};

    when("I request assignments for a class with non-existent ID", async () => {
      response = await request(app).get(
        "/classes/aec6817e-66b4-4ce5-8a25-f3ec459e40df/assignments"
      );
    });

    then("I should receive a 404 not found error", () => {
      expect(response.status).toBe(404);
    });
  });

  test("Attempt to retrieve assignments for a class with an invalid ID format", ({
    when,
    then,
  }) => {
    let response: any = {};

    when("I request assignments for a class with an invalid ID", async () => {
      response = await request(app).get("/classes/123/assignments");
    });

    then("I should receive a 400 bad request error", () => {
      expect(response.status).toBe(400);
    });
  });
});
