

import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import { CompositionRoot } from '../../../src/modules/compositionRoot';

const feature = loadFeature(path.join(__dirname, './userRegistrationAndPostInteraction.feature'));

defineFeature(feature, test => {
  test('User registers an account, submits first post, and receives upvotes and comments', ({ given, when, and, then }) => {
    
    let compositionRoot = new CompositionRoot();
    let driver = compositionRoot.getE2EWebTestDriver();

    let memberId = '1232133123213213';
    
    beforeAll(async () => {
      await driver.start();
    });
    
    given('there is at least one existing member', async () => {
      // Use the driver to create an existing member
      await driver.createExistingMember();
    });

    when('I register as a member', async () => {
      // Use the driver to register as a member
      await driver.registerAsMember();
    });

    and('I submit my first post', async () => {
      // Use the driver to submit the first post
      await driver.submitPost();
    });

    then('my post should be initially upvoted by me', async () => {
      // Use the driver to get the post votes
      let votes = await driver.getPostVotes();
      expect(votes.length).toEqual(1);
      expect(votes[0].memberId).toEqual(memberId);
    });

    and('another member leaves a comment on my post', async () => {
      // Use the driver to simulate another member leaving a comment
      await driver.leaveCommentOnPost();
    });

    then('I should receive a FirstUpvoteAchievement email', async () => {
      // Use the driver to check for the FirstUpvoteAchievement email
      let achievementEmail = await driver.checkFirstUpvoteAchievementEmail();
      expect(achievementEmail).toBeDefined();
    });

    and('I should receive a notification email about the comment on my post', async () => {
      // Use the driver to check for the notification email about the comment
      let commentNotificationEmail = await driver.checkCommentNotificationEmail();
      expect(commentNotificationEmail).toBeDefined();
    });

    afterAll(async () => {
      await driver.stop();
    });
  });
});

