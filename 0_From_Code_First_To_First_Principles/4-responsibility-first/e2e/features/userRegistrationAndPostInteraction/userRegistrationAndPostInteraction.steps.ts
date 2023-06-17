

import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import { RESTfulAPITestDriver } from '../../shared/testDrivers/restfulAPITestDriver';
import { CompositionRoot } from '../../../src/modules/compositionRoot';

const feature = loadFeature(path.join(__dirname, './userRegistrationAndPostInteraction.feature'));

defineFeature(feature, test => {
  test('User registers an account, submits first post, and receives upvotes and comments', ({ given, when, and, then }) => {
    
    let compositionRoot = new CompositionRoot();

    let api = compositionRoot.getWebAPI()
    let driver = new RESTfulAPITestDriver(api);

    let memberId = '1232133123213213'
    
    beforeAll(async () => {
      // await driver.stop();
      // await driver.start();
    })
    
    given('there is at least one existing member', () => {

    });

    when('I register as a member', async () => {
      // await driver.registerAsMember()
    });

    and('I submit my first post', async () => {
      // await driver.submitPost()
    });

    then('my post should be initially upvoted by me', async () => {
      // let votes = await driver.getPostVotes();
      // expect(votes.length).toEqual(1);
      // expect(votes[0].memberId).toEqual(memberId);
    });

    and('another member leaves a comment on my post', () => {

    });

    then('I should receive a FirstUpvoteAchievement email', () => {

    });

    and('I should receive a notification email about the comment on my post', () => {

    });
  });
});

