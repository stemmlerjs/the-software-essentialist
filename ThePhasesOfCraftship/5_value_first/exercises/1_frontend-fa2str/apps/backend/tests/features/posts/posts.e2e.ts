import { createAPIClient } from "@dddforum/api";
import { Inputs } from "@dddforum/api/posts";
import { CompositionRoot } from "../../../src/shared/compositionRoot";
import { DatabaseFixture } from "@dddforum/shared/tests/support/fixtures/databaseFixture";
import { Config } from "../../../src/shared/config";
import { MemberReputationLevel } from "../../../src/modules/members/domain/member";

import { setupMember } from "../../fixtures/members";
import { setupLevel2MemberWithUpvotedPost, setupPost } from "../../fixtures/posts";
import { EventOutboxTable } from "@dddforum/shared/src/events/outbox/eventOutboxTable";
import { MemberReputationLevelUpgraded } from "@dddforum/backend/src/modules/members/domain/memberReputationLevelUpgraded";
import jwt from 'jsonwebtoken';

describe('posts', () => {

    let databaseFixture: DatabaseFixture;
    let apiClient = createAPIClient("http://localhost:3000");
    let composition: CompositionRoot;
    let config: Config = new Config("test:e2e");
    let outbox: EventOutboxTable;

    beforeAll(async () => {
      composition = CompositionRoot.createCompositionRoot(config);
      await composition.start();
      databaseFixture = new DatabaseFixture(composition);
      outbox = composition.getEventOutboxTable();
    });

    afterAll(async () => {
      await composition.stop()
    });

    // TODO: We will hook this up afterwards in RDD-First part 2
    let authToken: string = "asdasds"

    // Create a mock JWT token for testing
    const createTestToken = (memberId: string) => {
      return jwt.sign(
        { 
          sub: memberId,
          permissions: ['create:posts']
        },
        'test-secret',
        { expiresIn: '1h' }
      );
    };

    beforeEach(() => {
      // Reset authToken before each test
      authToken = '';
    });

    it('should not be able to create a post if they are level 1', async () => {
      const { member } = await setupMember(databaseFixture, MemberReputationLevel.Level1);
      authToken = createTestToken(member.id);
    
      let postData: Inputs.CreatePostInput = {
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
    
      let postData: Inputs.CreatePostInput = {
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

      // Read model updated (eventually consistent)
      let getPostResponse = await apiClient.posts.getPostById(response.data.id);
      expect(getPostResponse.success).toBe(true);
      expect(getPostResponse.data.title).toBe(postData.title);
      expect(getPostResponse.data.postType).toBe(postData.postType);
      expect(getPostResponse.data.content).toBe(postData.content);
      expect(getPostResponse.data.voteScore).toBe(1);
    });

    it ('can create a link post', async () => {
      const { member } = await setupMember(databaseFixture, MemberReputationLevel.Level2);

      let postData: Inputs.CreatePostInput = {
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

      let postData: Inputs.CreatePostInput = {
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

      let postData: Inputs.CreatePostInput = {
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

    test.only(`Given a member with a Level 2 reputation w/ a score of 10 exists,
      With 1 post upvoted 10 times by different members,
      When the post is upvoted by a new member, 
      Then it should trigger a member reputation update to Level 3
      With a repuation score of 12 (including their own initial upvote on the post)
      And it should send a notification to the member`, async () => {
        // Set up the member with a level 2 reputation
        const { member, post } = await setupLevel2MemberWithUpvotedPost({ fixture: databaseFixture, upvoteCount: 10 });
        // Create the new member that's going to upvote the new post
        const { member: newUpvoter } = await setupMember(databaseFixture, MemberReputationLevel.Level2);

        // Upvote the post
        let response = await apiClient.votes.voteOnPost({ 
          postId: post.id, 
          memberId: newUpvoter.id,
          voteType: 'upvote'
        }, authToken);

        console.log(response);

        expect(response).toBeDefined();
        expect(response.success).toBe(true);

        // Wait for eventual consistency
        await new Promise(resolve => setTimeout(resolve, 5000));

        const memberEvents = await outbox.getEventsByAggregateId(member.id);
        const reputationUpgradedEvent = memberEvents.find((e) => e.name === 'MemberReputationLevelUpgraded') as MemberReputationLevelUpgraded;

        // Expect that the outbox also has an event for the member reputation updated since 
        expect(reputationUpgradedEvent).toBeDefined();
        expect(reputationUpgradedEvent.aggregateId).toEqual(member.id);
        expect((reputationUpgradedEvent.data).newLevel).toEqual(MemberReputationLevel.Level3);
        expect((reputationUpgradedEvent.data).newRepuationScore).toEqual(12);

        // (nice to have - triggered as a response to the 'MemberReputationLevelUpgraded' event)
        // expect (jobQueue.getJobByType('SendEmailNotification')).toBeDefined();
    }, 20000)
})
