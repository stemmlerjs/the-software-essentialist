

import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import { CompositionRoot } from '../../../src/shared/bootstrap/service/compositionRoot/compositionRoot';
import { UserBuilder } from '../../../src/shared/testing/builders/userBuilder'
import { TestWebApplicationDriver } from '../../../src/shared/bootstrap/service/applicationDriver/testWebApplicationDriver';

const feature = loadFeature(path.join(__dirname, './userRegistrationAndPostInteraction.feature'));

defineFeature(feature, test => {
  test('User registers an account, submits first post, and receives upvotes and comments', ({ given, when, and, then }) => {
    
    let compositionRoot = new CompositionRoot('test');
    let driver = compositionRoot.getApplicationDriver() as TestWebApplicationDriver;

    let memberId = '1232133123213213';
    let existingUserInput = {}
    
    beforeAll(async () => {
      await driver.reset();
      await driver.start();
    });
    
    given('there is at least one existing member', async () => {
      // Use the driver to create an existing member
      let existingUserProps = UserBuilder
        .builder()
        .asRole('member')
        .build()

      await driver.builder()
        .withExistingUsers([existingUserProps])
        .build() //setup
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

    and('another member upvotes my post', async () => {
      await driver.upvotePost(); // use the existing memberId
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

