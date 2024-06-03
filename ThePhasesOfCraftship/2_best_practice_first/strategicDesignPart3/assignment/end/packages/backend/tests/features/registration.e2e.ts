import * as path from "path";
import { defineFeature, loadFeature } from "jest-cucumber";
import { sharedTestRoot } from "@dddforum/shared/src/paths";
import { CreateUserBuilder } from "@dddforum/shared/tests/support/builders/createUserBuilder";
import { DatabaseFixture } from "@dddforum/shared/tests/support/fixtures/databaseFixture";
import { CreateUserParams, CreateUserResponse } from "@dddforum/shared/src/api/users";
import { createAPIClient } from "@dddforum/shared/src/api";
import { CompositionRoot } from "@dddforum/backend/src/shared/compositionRoot";
import { WebServer } from "@dddforum/backend/src/shared/http/webServer";
import { Config } from "@dddforum/backend/src/shared/config";
import { Database } from "../../src/shared/database";
import { AddEmailToListResponse } from "@dddforum/shared/src/api/marketing";

const feature = loadFeature(
  path.join(sharedTestRoot, "features/registration.feature"),
);

defineFeature(feature, (test) => {
  let databaseFixture: DatabaseFixture;
  const apiClient = createAPIClient('http://localhost:3000');
  let composition: CompositionRoot
  let server: WebServer
  const config: Config = new Config("test:e2e");
  let response: CreateUserResponse
  let createUserResponses: CreateUserResponse[] = [];
  let addEmailToListResponse: AddEmailToListResponse;
  let dbConnection: Database
  

  beforeAll(async () => {
    composition = CompositionRoot.createCompositionRoot(config);
    server = composition.getWebServer();
    databaseFixture = new DatabaseFixture();
    dbConnection = composition.getDBConnection();

    await server.start();
    await dbConnection.connect();
  });

  afterEach(async () => {
    await databaseFixture.resetDatabase();
    createUserResponses = []
  });

  afterAll(async () => {
    await server.stop();
  });

  test('Successful registration with marketing emails accepted', ({ given, when, then, and }) => {
    let user: CreateUserParams;
    
    given('I am a new user', async () => {
      user = new CreateUserBuilder()
        .withAllRandomDetails()
        .build();
    });

    when('I register with valid account details accepting marketing emails', async () => {
      response = await apiClient.users.register(user);
      addEmailToListResponse = await apiClient.marketing.addEmailToList(user.email);
    });

    then('I should be granted access to my account', async () => {
      const { data, success, error } = response;

      // Expect a successful response (Result Verification)
      expect(success).toBeTruthy();
      expect(error).toEqual({});
      expect(data!.id).toBeDefined();
      expect(data!.email).toEqual(user.email);
      expect(data!.firstName).toEqual(user.firstName);
      expect(data!.lastName).toEqual(user.lastName);
      expect(data!.username).toEqual(user.username);

      // And the user exists (State Verification)
      const getUserResponse = await apiClient.users.getUserByEmail(user.email);
      const {data: getUserData} = getUserResponse;
      expect(user.email).toEqual(getUserData!.email);
    });

    and('I should expect to receive marketing emails', () => {
      // How can we test this? what do we want to place under test?
      // Well, what's the tool they'll use? mailchimp?
      // And do we want to expect that mailchimp is going to get called to add
      // a new contact to a list? Yes, we do. But we're not going to worry 
      // about this yet because we need to learn how to validate this without
      // filling up a production Mailchimp account with test data. 
      const { success } = addEmailToListResponse

      expect(success).toBeTruthy();
    });
  });

  test("Successful registration without marketing emails accepted", ({ given, when, then, and }) => {
    let user: CreateUserParams;
    

    given("I am a new user", () => {
      user = new CreateUserBuilder().withAllRandomDetails().build();
    });

    when("I register with valid account details declining marketing emails", async () => {
      response = await apiClient.users.register(user);
    });

    then("I should be granted access to my account", () => {
      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data!.email).toBe(user.email);
      expect(response.data!.username).toBe(user.username);
      expect(response.data!.firstName).toBe(user.firstName);
      expect(response.data!.lastName).toBe(user.lastName);
      expect(response.data!.id).toBeDefined();
    });

    and("I should not expect to receive marketing emails", () => {
      const { success } = addEmailToListResponse

      expect(success).toBeTruthy();
      // How can we test this? what do we want to place under test?
      // we'll implement this later
    });
  });

  test("Invalid or missing registration details", ({
    given,
    when,
    then,
    and,
  }) => {
    let user: any;

    given("I am a new user", () => {
      const validUser = new CreateUserBuilder().withAllRandomDetails().build();

      user = {
        firstName: validUser.firstName,
        email: validUser.email,
        lastName: validUser.lastName,
      };
    });

    when("I register with invalid account details", async () => {
      response = await apiClient.users.register(user);
    });

    then("I should see an error notifying me that my input is invalid", () => {
      expect(response.success).toBe(false);
      expect(response.data).toBeNull();
      expect(response.error).toBeDefined();
    });

    and("I should not have been sent access to account details", () => {
      expect(response.success).toBe(false);
      expect(response.data).toBeNull();
      expect(response.error).toBeDefined();
    });
  });

  test("Account already created with email", ({ given, when, then, and }) => {
    let existingUsers: CreateUserParams[] = [];

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
          return apiClient.users.register(user);
        }),
      );
    });

    then(
      "they should see an error notifying them that the account already exists",
      () => {
        for (const response of createUserResponses) {
          expect(response.error).toBeDefined();
          expect(response.success).toBeFalsy();
          expect(response.error.code).toEqual("EmailAlreadyInUse");
        }
      },
    );

    and("they should not have been sent access to account details", () => {
      createUserResponses.forEach((response) => {
        expect(response.success).toBe(false);
        expect(response.data).toBeNull();
        expect(response.error).toBeDefined();
      });
    });
  });

  test("Username already taken", ({ given, when, then, and }) => {
    let existingUsers: CreateUserParams[] = [];

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
            return apiClient.users.register(user);
          }),
        );
      },
    );

    then(
      "they see an error notifying them that the username has already been taken",
      () => {
        for (const response of createUserResponses) {
          expect(response.error).toBeDefined();
          expect(response.success).toBeFalsy();
          expect(response.error.code).toEqual("UsernameAlreadyTaken");
        }
      },
    );

    and("they should not have been sent access to account details", () => {
      createUserResponses.forEach((response) => {
        expect(response.success).toBe(false);
        expect(response.data).toBeNull();
        expect(response.error).toBeDefined();
      });
    });
  });
});
