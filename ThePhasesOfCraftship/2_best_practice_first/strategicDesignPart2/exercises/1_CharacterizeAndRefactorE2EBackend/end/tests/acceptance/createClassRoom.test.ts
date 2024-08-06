import request from "supertest";
import { app } from "../../src/index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";

const feature = loadFeature(
  path.join(__dirname, "../features/createClassRoom.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Sucessfully create a class room", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};

    given(/^I want to create a class room named "(.*)"$/, (name) => {
      requestBody = {
        name,
      };
    });

    when("I send a request to create a class room", async () => {
      response = await request(app).post("/classes").send(requestBody);
    });

    then("the class room should be created successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe(requestBody.name);
    });
  });

  test("Fail to create a class room", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};

    given("I want to create a class room with no name", () => {
      requestBody = {};
    });

    when("I send a request to create a class room", async () => {
      response = await request(app).post("/classes").send(requestBody);
    });

    then("the class room should not be created", () => {
      expect(response.status).toBe(400);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("ValidationError");
    });
  });

  test("Classroom already exists", ({ given, when, then }) => {
    let classroomName = "Science";
    let requestBody: any = {
      name: classroomName
    };
    let response: any = {};

    given("a classroom already exists", () => {
      // ??
    });

    when("I send a request to create a class room of the same name", async () => {
      response = await request(app).post("/classes").send(requestBody);
    });

    then("the class room should not be created", () => {
      expect(response.status).toBe(500);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("ServerError");
    });
  });
});
