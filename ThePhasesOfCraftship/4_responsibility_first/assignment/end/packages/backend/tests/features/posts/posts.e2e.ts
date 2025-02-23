
import { APIClient, createAPIClient } from "@dddforum/shared/src/api";
import { CreatePostInput } from "@dddforum/shared/src/api/posts";
import { CompositionRoot } from "../../../src/shared/compositionRoot";
import { DatabaseFixture } from "@dddforum/shared/tests/support/fixtures/databaseFixture";
import { Config } from "../../../src/shared/config";
import { Member, MemberReputationLevel } from "../../../src/modules/members/domain/member";
import { MemberUsername } from "../../../src/modules/members/domain/memberUsername";

async function setupMember(fixture: DatabaseFixture, reputationLevel: MemberReputationLevel, score: number = 6) {
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
  return { post: response.data };
}

describe('posts', () => {

    let databaseFixture: DatabaseFixture;
    let apiClient = createAPIClient("http://localhost:3000");
    let composition: CompositionRoot;
    let config: Config = new Config("test:e2e");

    beforeAll(async () => {
      composition = CompositionRoot.createCompositionRoot(config);
      await composition.start();
      databaseFixture = new DatabaseFixture(composition);
    });

    afterAll(async () => {
      await composition.stop()
    });

    // TODO: Soon, we will need to use a sandboxed auth token to do this (RDD-first)
    let authToken: string = "asdasds"

    it('should not be able to create a post if they are level 1', async () => {
      const { member } = await setupMember(databaseFixture, MemberReputationLevel.Level1);
    
      let postData: CreatePostInput = {
        memberId: member.id,
        title: 'My first post',
        postType: "text",
        content: 'This is my first post! I hope you like it!'
      };

      let response = await apiClient.posts.create(postData, authToken);

      expect(response).toBeDefined();
      expect(response.success).toBe(false);
      expect(response.error?.code).toBeDefined();
      expect(response.error?.code).toEqual('PermissionError');
    });

    it ('should have an initial upvote when creating a post', async () => {
      const { member } = await setupMember(databaseFixture, MemberReputationLevel.Level2);
    
      let postData: CreatePostInput = {
        memberId: member.id,
        title: 'My first post',
        postType: "text",
        content: 'This is my first post! I hope you like it!'
      };

      let response = await apiClient.posts.create(postData, authToken);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.data.title).toBe(postData.title);
      expect(response.data.postType).toBe(postData.postType);
      expect(response.data.content).toBe(postData.content);
      
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Read model updated
      let getPostResponse = await apiClient.posts.getPostById(response.data.id);
      expect(getPostResponse.success).toBe(true);
      expect(getPostResponse.data.title).toBe(postData.title);
      expect(getPostResponse.data.postType).toBe(postData.postType);
      expect(getPostResponse.data.content).toBe(postData.content);
      expect(getPostResponse.data.voteScore).toBe(1);
    });

    it ('can create a link post', async () => {
      const { member } = await setupMember(databaseFixture, MemberReputationLevel.Level2);

      let postData: CreatePostInput = {
        memberId: member.id,
        title: 'Check out this site',
        postType: 'link',
        link: 'https://khalilstemmler.com'
      };
      let response = await apiClient.posts.create(postData, authToken);
      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.data.title).toBe(postData.title);
      expect(response.data.postType).toBe(postData.postType);
      expect(response.data.content).toBe(postData.content);
    });

    it ('cannot create a link post without supplying a link', async () => {
      const { member } = await setupMember(databaseFixture, MemberReputationLevel.Level2);

      let postData: CreatePostInput = {
        memberId: member.id,
        title: 'Check out this site',
        postType: 'link',
        link: ''
      };
      let response = await apiClient.posts.create(postData, authToken);
      expect(response).toBeDefined();
      expect(response.success).toBe(false);
      expect(response.error).toBeDefined();
      expect(response.error?.code).toBeDefined();
      expect(response.error?.code).toEqual('ValidationError');
    });

    it ('cannot create a text post without supplying content', async () => {
      const { member } = await setupMember(databaseFixture, MemberReputationLevel.Level2);

      let postData: CreatePostInput = {
        memberId: member.id,
        title: 'A new post',
        postType: "text",
        content: ''
      };
      let response = await apiClient.posts.create(postData, authToken);

      expect(response).toBeDefined();
      expect(response.success).toBe(false);
      expect(response.error).toBeDefined();
    });

    it ('can fetch a previously created post by id', async () => {
      const { member } = await setupMember(databaseFixture, MemberReputationLevel.Level2);
      const { post } = await setupPost(apiClient, member, authToken);
  
      let response = await apiClient.posts.getPostById(post.id);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
    });
  
    it ('returns a not found error if the post does not exist', async () => {
  
      let response = await apiClient.posts.getPostById('non-existent-id');

      expect(response).toBeDefined();
      expect(response.success).toBe(false);
      expect(response.error).toBeDefined();
    });


    // TODO: Final test

    it(`Given a member with a level 2 reputation exists and has 9 posts, 
      each with 1 upvote by different members, 
      when a new post is upvoted, 
      then it should trigger a member reputation update and send a notification to the member`, async () => {

      // Create a member with a level 2 reputation and 9 posts with 9 upvotes, each by different members on each of them
      // Create the new post we're going to upvote
      // Create the new member that's going to upvote the new post

      // Upvote the post

      // Expect that the outbox has an event for the post upvoted
      // Expect that the outbox also has an event for the member reputation updated since 
    })
})
