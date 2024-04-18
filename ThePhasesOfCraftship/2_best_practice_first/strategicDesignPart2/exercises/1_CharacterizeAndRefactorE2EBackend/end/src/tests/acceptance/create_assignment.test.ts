import request from "supertest";
import { app } from "../../index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { classBuilder } from "../fixtures/builders";

const feature = loadFeature(
  path.join(__dirname, "../features/create_assignment.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Successfully create an assignment", ({ given, when, then, and }) => {
    let requestBody: any = {};
    let response: any = {};
    let class_: any = null;

    given("I give a class", async () => {
      class_ = await classBuilder();
    });

    when("I create an assignment to the class", async () => {
      requestBody = {
        title: "Assignment 1",
        classId: class_.id,
      };

      response = await request(app).post("/assignments").send(requestBody);
    });

    then("the assignment should be created successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body.data.title).toBe(requestBody.title);
    });
  });
});
