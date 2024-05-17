import path from "path";
import request from "supertest";
import { defineFeature, loadFeature } from "jest-cucumber";
import { app } from "@dddforum/backend/src/shared/bootstrap";
import { sharedTestRoot } from "@dddforum/shared/src/paths";
import { CreateUserBuilder } from "@dddforum/shared/tests/support/builders/createUserBuilder";
import { CreateUserParams } from "@dddforum/shared/src/api/users";
import { DatabaseFixture } from "@dddforum/shared/tests/support/fixtures/databaseFixture";
import { Errors } from "../../src/shared/errors";

const feature = loadFeature(
  path.join(sharedTestRoot, "features/registration.feature"),
  { tagFilter: "@backend and not @excluded" },
);

defineFeature(feature, (test) => {
  let databaseFixture: DatabaseFixture;

  beforeAll(() => {
    databaseFixture = new DatabaseFixture();
  });

  afterEach(async () => {
    await databaseFixture.resetDatabase();
  });

  test("Successful registration", ({ given, when, then }) => {
    let user: CreateUserParams;
    let response: request.Response;

    given("I am a new user", () => {
      user = new CreateUserBuilder().withAllRandomDetails().build();
    });

    when("I register with valid account details", async () => {
      response = await request(app).post("/users/new").send(user);
    });

    then("I should be granted access to my account", () => {
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.email).toBe(user.email);
      expect(response.body.data.username).toBe(user.username);
      expect(response.body.data.firstName).toBe(user.firstName);
      expect(response.body.data.lastName).toBe(user.lastName);
      expect(response.body.data.id).toBeDefined();
    });
  });

  test("Invalid or missing registration details", ({
    given,
    when,
    then,
    and,
  }) => {
    let user: any;
    let response: request.Response;

    given("I am a new user", () => {
      const validUser = new CreateUserBuilder().withAllRandomDetails().build();

      user = {
        firstName: validUser.firstName,
        email: validUser.email,
        lastName: validUser.lastName,
      };
    });

    when("I register with invalid account details", async () => {
      response = await request(app).post("/users/new").send(user);
    });

    then("I should see an error notifying me that my input is invalid", () => {
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.data).toBeUndefined();
      expect(response.body.error).toBeDefined();
    });

    and("I should not have been sent access to account details", () => {
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.data).toBeUndefined();
      expect(response.body.error).toBeDefined();
    });
  });

  test("Account already created with email", ({ given, when, then, and }) => {
    let existingUsers: CreateUserParams[] = [];
    let createUserResponses: request.Response[] = [];

    given("a set of users already created accounts", async (table) => {
      existingUsers = table.map((row: any) => {
        return new CreateUserBuilder()
          .withFirstName(row.firstName)
          .withLastName(row.lastName)
          .withEmail(row.email)
          .build();
      });
      await databaseFixture.setupWithExistingUsers(existingUsers);
    });

    when("new users attempt to register with those emails", async () => {
      createUserResponses = await Promise.all(
        existingUsers.map((user) => {
          return request(app).post("/users/new").send(user);
        }),
      );
    });

    then(
      "they should see an error notifying them that the account already exists",
      () => {
        for (const { body } of createUserResponses) {
          expect(body.error).toBeDefined();
          expect(body.success).toBeFalsy();
          expect(body.error).toEqual(Errors.EmailAlreadyInUse);
        }
      },
    );

    and("they should not have been sent access to account details", () => {
      createUserResponses.forEach((response) => {
        expect(response.status).toBe(409);
        expect(response.body.success).toBe(false);
        expect(response.body.data).toBeUndefined();
        expect(response.body.error).toBeDefined();
      });
    });
  });

  test("Username already taken", ({ given, when, then, and }) => {
    let existingUsers: CreateUserParams[] = [];
    let createUserResponses: request.Response[] = [];

    given(
      "a set of users have already created their accounts with valid details",
      async (table) => {
        existingUsers = table.map((row: any) => {
          return new CreateUserBuilder()
            .withFirstName(row.firstName)
            .withLastName(row.lastName)
            .withEmail(row.email)
            .withUsername(row.username)
            .build();
        });
        await databaseFixture.setupWithExistingUsers(existingUsers);
      },
    );

    when(
      "new users attempt to register with already taken usernames",
      async (table) => {
        const newUsers: CreateUserParams[] = table.map((row: any) => {
          return new CreateUserBuilder()
            .withFirstName(row.firstName)
            .withLastName(row.lastName)
            .withEmail(row.email)
            .withUsername(row.username)
            .build();
        });

        createUserResponses = await Promise.all(
          newUsers.map((user) => {
            return request(app).post("/users/new").send(user);
          }),
        );
      },
    );

    then(
      "they see an error notifying them that the username has already been taken",
      () => {
        for (const { body } of createUserResponses) {
          expect(body.error).toBeDefined();
          expect(body.success).toBeFalsy();
          expect(body.error).toEqual(Errors.UsernameAlreadyTaken);
        }
      },
    );

    and("they should not have been sent access to account details", () => {
      createUserResponses.forEach((response) => {
        expect(response.status).toBe(409);
        expect(response.body.success).toBe(false);
        expect(response.body.data).toBeUndefined();
        expect(response.body.error).toBeDefined();
      });
    });
  });
});
