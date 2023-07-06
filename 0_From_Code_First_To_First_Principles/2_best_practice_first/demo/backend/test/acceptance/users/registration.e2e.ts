import { defineFeature, loadFeature } from "jest-cucumber";
import * as path from "path";
import { UserBuilder } from "../../../../shared/users/builders/userBuilder";
import { CreateUserInput } from "../../../../shared/users/dtos/createUserInput";
import { RESTfulAPIDriver } from "../../restfulAPIDriver";
import { CompositionRoot } from "../../../src/shared/infra/composition/compositionRoot";

const feature = loadFeature(
  path.join(__dirname, "../../../../shared/users/e2e/registration.feature")
);

defineFeature(feature, (test) => {
  test("Successful registration", ({ given, when, then, and }) => {
    let createUserInput: CreateUserInput;
    let restfulAPIDriver: RESTfulAPIDriver;
    let compositionRoot: CompositionRoot = new CompositionRoot();
    let server = compositionRoot.getWebServer();
    let response: any;

    beforeAll(async () => {
      await server.start();

      restfulAPIDriver = new RESTfulAPIDriver(
        server.getHttp()
      );
    });

    given("I am a new user", async () => {
      createUserInput = new UserBuilder()
        .withFirstName("Khalil")
        .withLastName("Stemmler")
        .withUsername("stemmlerjs")
        .withRandomEmail()
        .build();
    });

    when("I register with valid account details", async () => {
      response = await restfulAPIDriver.post("/users/new", createUserInput);
    });

    then("I should be granted access to my account", async () => {
      expect(response.body.id).toBeDefined();
      expect(response.body.email).toEqual(createUserInput.email);
      expect(response.body.firstName).toEqual(createUserInput.firstName);
      expect(response.body.lastName).toEqual(createUserInput.lastName);
      expect(response.body.username).toEqual(createUserInput.username);
    });

    and("I should receive an email with login instructions", () => {
      // Can't test this at this level
    });

    afterAll(async () => {
      await server.stop();
    });
  });
});
