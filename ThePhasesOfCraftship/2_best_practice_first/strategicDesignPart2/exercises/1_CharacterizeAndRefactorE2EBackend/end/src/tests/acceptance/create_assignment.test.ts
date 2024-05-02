import request from "supertest";
import { app } from "../../index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { ClassRoomBuilder } from "../fixtures/classRoomBuilder";
import { ClassRoom } from "../fixtures";

const feature = loadFeature(
  path.join(__dirname, "../features/create_assignment.feature")
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test("Successfully create an assignment", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};
    let classRoom: ClassRoom;

    given("I give a class", async () => {
      ({ classRoom } = await new ClassRoomBuilder().build());
    });

    when("I create an assignment to the class", async () => {
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
