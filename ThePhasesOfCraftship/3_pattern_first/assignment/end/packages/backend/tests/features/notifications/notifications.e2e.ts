
import { APIClient, createAPIClient } from "@dddforum/shared/src/api";
import { CreatePostInput } from "@dddforum/shared/src/api/posts";
import { CompositionRoot } from "../../../src/shared/compositionRoot";
import { DatabaseFixture } from "@dddforum/shared/tests/support/fixtures/databaseFixture";
import { Database } from "../../../src/shared/database";
import { Config } from "../../../src/shared/config";
import { WebServer } from "../../../src/shared/http";
import { Member, MemberReputationLevel } from "../../../src/modules/members/domain/member";
import { MemberUsername } from "../../../src/modules/members/domain/memberUsername";
import { success } from "@dddforum/shared/src/core/useCase";
import { UpvotePostCommand } from "../../../src/modules/votes/votesCommands";

async function setupMember(fixture: DatabaseFixture, reputationLevel: MemberReputationLevel, score: number = 9) {
  const member = Member.toDomain({
    id: '78b501b8-b72b-48d7-af2e-6dab6e53ff00',
    userId: '961f6e1a-b078-4e9c-b02e-9855e8f26099',
    username: MemberUsername.toDomain('khalilstemmler'),
    reputationLevel: reputationLevel,
    reputationScore: score,
  });
  await fixture.setupWithExistingMembers([member]);
  return { member };
}

async function setupPost (apiClient: APIClient, member: Member, authToken: string) {
  let postData: CreatePostInput = {
    memberId: member.id,
    title: 'A new post',
    postType: "text",
    content: 'This is a new text post that I am creating!'
  };
  let response = await apiClient.posts.create(postData, authToken);

  expect(response).toBeDefined();
  expect(response.success).toBe(true);
  return { post: response.data};
}

describe('notifications', () => {

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

  test(`Given a member is Level 1 and has a member is upgraded to level 2 after upvoting a post, we send a notification to the member`, async () => {

    const { member } = await setupMember(databaseFixture, MemberReputationLevel.Level1, 9);
    const { post } = await setupPost(apiClient, member, 'auth-token');

    const sendNotificationSpy = jest.spyOn(composition['notificationsModule']['notificationsService'], 'sendNotification')
      .mockImplementation((c) => Promise.resolve(success(undefined)));

    const upvotePostCommand = new UpvotePostCommand(post.id, member.id);
    await composition.getApplication().votes.castVoteOnPost(upvotePostCommand);

    expect(sendNotificationSpy).toHaveBeenCalled();
    

    // expect(response).toBeDefined();
    // expect(response.success).toBe(false);
    // expect(response.error?.code).toBeDefined();
    // expect(response.error?.code).toEqual('PermissionError');
  });

})
