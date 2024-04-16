
import { mockDeep } from "jest-mock-extended";
import { createAPIClient } from "@dddforum/shared/src/api";
import { Application } from "../../shared/application/applicationInterface";
import { WebServer } from "../../shared/webAPI/webServer";

describe("postsController", () => {
  let client = createAPIClient("http://localhost:3000");
  let application = mockDeep<Application>();
  let server = new WebServer({ port: 3000, application });

  beforeAll(async () => {
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  it("can get posts", async () => {
    // Arrange
    // Set up the mocked response. For demonstration purposes. Use builders, mappers 
    // & dtos to get really fancy with this.
    application.posts.getPosts.mockReturnValue(
      new Promise((resolve) =>
        resolve({ error: undefined, data: { posts: [] }, success: true }),
      ),
    );

    // Act
    // Use the client library to make the api call (pass through as much 
    // uncertainty as possible)
    const response = await client.posts.getPosts();

    // Communication: Expect it to have called the correct use case
    expect(application.posts.getPosts).toHaveBeenCalledTimes(1);
  });
});
