
import { createAPIClient } from "@dddforum/shared/src/api";
import { CreatePostInput } from "@dddforum/shared/src/api/posts";
import { CompositionRoot } from "../../../src/shared/compositionRoot";
import { DatabaseFixture } from "@dddforum/shared/tests/support/fixtures/databaseFixture";
import { Database } from "../../../src/shared/database";
import { Config } from "../../../src/shared/config";
import { WebServer } from "../../../src/shared/http";
import { Member, MemberReputationLevel } from "../../../src/modules/members/domain/member";
import { MemberUsername } from "../../../src/modules/members/domain/memberUsername";

async function setupTest(fixture: DatabaseFixture) {
  const member = Member.toDomain({
    id: '78b501b8-b72b-48d7-af2e-6dab6e53ff00',
    userId: '961f6e1a-b078-4e9c-b02e-9855e8f26099',
    username: MemberUsername.toDomain('khalilstemmler'),
    reputationLevel: MemberReputationLevel.Level1,
    reputationScore: 6,
  });
  await fixture.setupWithExistingMembers([member]);
  return { member };
}


describe('posts', () => {

  describe ('creating new posts', () => {

    let databaseFixture: DatabaseFixture;
    const apiClient = createAPIClient("http://localhost:3000");
    let composition: CompositionRoot;
    let server: WebServer;
    const config: Config = new Config("test:e2e");
    let dbConnection: Database;

    beforeAll(async () => {
      composition = CompositionRoot.createCompositionRoot(config);
      server = composition.getWebServer();
      databaseFixture = new DatabaseFixture(composition);
      dbConnection = composition.getDatabase();
  
      await server.start();
      await dbConnection.connect();
    });

    afterAll(async () => {
      await server.stop();
    });

    // TODO: Soon, we will need to use a sandboxed auth token to do this (RDD-first)
    let authToken: string = "asdasds"

    it.only ('can create a text post', async () => {
      const { member } = await setupTest(databaseFixture);
      
      let postData: CreatePostInput = {
        memberId: member.id,
        title: 'My first post',
        postType: "text",
        content: 'This is my first post! I hope you like it!'
      };

      let response = await apiClient.posts.create(postData, authToken);

      console.log(response);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      // expect(response.data.title).toBe(postData.title);
      // expect(response.data.postType).toBe(postData.postType);
      // expect(response.data.content).toBe(postData.content);
      // expect(response.data.voteCount).toEqual(1);
    });

    // it ('can create a link post', async () => {
    //   let postData: CreatePostInput = {
    //     title: 'Check out this site',
    //     postType: 'link',
    //     link: 'https://khalilstemmler.com'
    //   };
    //   let response = await apiClient.posts.create(postData, authToken);
    //   expect(response).toBeDefined();
    //   expect(response.success).toBe(true);
    //   expect(response.data.title).toBe(postData.title);
    //   expect(response.data.postType).toBe(postData.postType);
    //   expect(response.data.content).toBe(postData.content);
    // });

    // it ('cannot create a link post without supplying a link', async () => {
    //   let postData: CreatePostInput = {
    //     title: 'Check out this site',
    //     postType: 'link',
    //     link: ''
    //   };
    //   let response = await apiClient.posts.create(postData, authToken);
    //   expect(response).toBeDefined();
    //   expect(response.success).toBe(false);
    //   expect(response.error).toBeDefined();
    //   // expect(response.error instanceof ValidationError).toBe()
    // });

    // it ('cannot create a text post without supplying content', async () => {
    //   let postData: CreatePostInput = {
    //     title: 'A new post',
    //     postType: "text",
    //     content: ''
    //   };
    //   let response = await apiClient.posts.create(postData, authToken);

    //   expect(response).toBeDefined();
    //   expect(response.success).toBe(false);
    //   expect(response.error).toBeDefined();
    // });

  });

  describe('fetching posts', () => {
    it ('can fetch a previously created post by id', async () => {})
    it ('returns a not found error if the post does not exist', async () => {})
  })
})
