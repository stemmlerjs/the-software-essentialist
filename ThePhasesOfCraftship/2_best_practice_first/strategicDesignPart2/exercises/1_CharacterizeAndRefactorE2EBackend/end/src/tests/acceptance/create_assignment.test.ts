import request from "supertest";
import { app } from "../../index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { prisma } from "../../database";

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

    given(/^I give a class named "(.*)"$/, async (name) => {
      class_ = await prisma.class.create({
        data: {
          name,
        },
      });
    });

    and(/^I want to create an assignment named "(.*)"$/, (title) => {
      requestBody = {
        title,
        classId: class_.id,
      };
    });

    when("I send a request to create an assignment", async () => {
      response = await request(app).post("/assignments").send(requestBody);
    });

    then("the assignment should be created successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe(requestBody.name);
    });
  });
});
