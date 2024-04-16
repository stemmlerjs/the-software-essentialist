
import { mockDeep } from "jest-mock-extended";
import { APIResponse, createAPIClient } from "@dddforum/shared/src/api";
import { Application } from "../../shared/application/applicationInterface";
import { WebServer } from "../../shared/webAPI/webServer";
import { CreateUserCommandBuilder } from "@dddforum/shared/tests/support/builders/createUserCommandBuilder";
import { UserDTOBuilder } from "@dddforum/shared/tests/support/builders/userDTOBuilder";

describe("usersController", () => {
  let client = createAPIClient("http://localhost:3000");
  let application = mockDeep<Application>();
  let server = new WebServer({ port: 3000, application });

  beforeAll(async () => {
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });


  it("can create users", async () => {
    let createUserCommand = new CreateUserCommandBuilder()
        .withFirstName('Khalil')
        .withLastName('Stemmler')
        .withRandomUsername()
        .withRandomEmail()
        .build();
        
    let responseDTO = new UserDTOBuilder()
      .fromCommand(createUserCommand)
      .build();

    application.user.createUser.mockReturnValue(
      new Promise((resolve) =>
        resolve({ error: undefined, data: responseDTO, success: true }),
      ),
    );

    // Act
    // Use the client library to make the api call (pass through as much 
    // uncertainty as possible)
    const response = await client.users.register(createUserCommand);

    // Communication: Expect it to have called the correct use case
    expect(application.user.createUser).toHaveBeenCalledTimes(1);
  });
});
