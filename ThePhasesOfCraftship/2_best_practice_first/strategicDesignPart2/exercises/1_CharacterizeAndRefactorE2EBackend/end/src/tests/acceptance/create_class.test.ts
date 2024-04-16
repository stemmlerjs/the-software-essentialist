import request from "supertest";
import { app } from "../../index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";

const feature = loadFeature(
  path.join(__dirname, "../features/create_class.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Sucessfully create a class", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};

    given(/^I want to create a class named "(.*)"$/, (name) => {
      requestBody = {
        name,
      };
    });

    when("I send a request to create a class", async () => {
      response = await request(app).post("/classes").send(requestBody);
    });

    then("the class should be created successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe(requestBody.name);
    });
  });

  test("Fail to create a class", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};

    given("I want to create a class no name", () => {
      requestBody = {};
    });

    when("I send a request to create a class", async () => {
      response = await request(app).post("/classes").send(requestBody);
    });

    then("the class should not be created", () => {
      expect(response.status).toBe(400);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("ValidationError");
    });
  });
});
