
// import { MemberReputationLevel } from "@dddforum/backend/src/modules/members/domain/member";
// import { CompositionRoot } from "@dddforum/backend/src/shared/compositionRoot";
// import { Config } from "@dddforum/backend/src/shared/config";
// import { createAPIClient } from "@dddforum/shared/src/api";
// import { DatabaseFixture } from "@dddforum/shared/tests/support/fixtures/databaseFixture";
// import { setupMember } from "../../fixtures/members";

// async function setupLevel1MemberWithManyUpvotedComments () {

// }

// describe('comments', () => {

//   // let databaseFixture: DatabaseFixture;
//   // let apiClient = createAPIClient("http://localhost:3000");
//   // let composition: CompositionRoot;
//   // let config: Config = new Config("test:e2e");

//   // beforeAll(async () => {
//   //   composition = CompositionRoot.createCompositionRoot(config);
//   //   await composition.start();
//   //   databaseFixture = new DatabaseFixture(composition);
//   // });

//   // afterAll(async () => {
//   //   await composition.stop()
//   // });

//   // // TODO: We will hook this up afterwards in RDD-First part 2
//   // let authToken: string = "asdasds"

//   test(`Given a member with a level 1 reputation exists and has 9 comments, 
//       each with 1 upvote by different members, 
//       when a comment is upvoted, 
//       then it should trigger a member reputation update and send a notification to the member`, async () => {
//         // // Create a member with a level 1 reputation and 9 posts with 9 upvotes, each by different members on each of them
//         // const { member, comments } = await setupLevel1MemberWithManyUpvotedComments();
//         // // Get the post we're going to upvote
//         // const commentToUpvote = comments[0];
//         // // Create the new member that's going to upvote the new post
//         // const { member: upvoter } = await setupMember(databaseFixture, MemberReputationLevel.Level2);

//         // // Upvote the post
//         // let response = await apiClient.comments.voteOnComment({ 
//         //   commentId: commentToUpvote.id, 
//         //   memberId: upvoter.id,
//         //   voteType: 'Upvote'
//         // }, authToken);

//         // // Expect that the outbox has an event for the post upvoted
//         // // Expect that the outbox also has an event for the member reputation updated since 
//     })
// })
