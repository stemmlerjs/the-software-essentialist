import request from "supertest";
import { app } from "../../src/index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { aClassRoom } from "../fixtures";
import { Class } from "@prisma/client";

const feature = loadFeature(
  path.join(__dirname, "../features/createAssignment.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Successfully create an assignment", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};
    let classRoom: Class;

    given("a class exists", async () => {
      classRoom = await aClassRoom().build();
    });

    when("I create an assignment for the class", async () => {
      requestBody = {
        title: "Assignment 1",
        classId: classRoom.id,
      };

      response = await request(app).post("/assignments").send(requestBody);
    });

    then("the assignment should be created successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body.data.title).toBe(requestBody.title);
    });
  });
});
