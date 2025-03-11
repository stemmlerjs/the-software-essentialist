
import { defineFeature, loadFeature } from 'jest-cucumber';
import { sharedTestRoot } from '@dddforum/shared/src/paths';
import { CreateUserParams } from "@dddforum/api/users";
import { Pages } from '../../support/pages/pages';

import * as path from 'path';
import { PuppeteerPageDriver } from '../../support/driver';
import { App, createAppObject } from '../../support/pages';
import { DatabaseFixture } from '@dddforum/shared/tests/support/fixtures/databaseFixture';

const feature = loadFeature(path.join(sharedTestRoot, 'features/registration.feature'), { tagFilter: '@frontend' });

/**
 * 
 * TODO:
 * New registration
 * 
 * As a user, when I go to the register page 
 * and I register with google 
 * then I should have created an account
 * and I should be redirected to the onboarding page
 * and I should have my details stored in local storage
 * 
 * As a user who has already registered with google
 * But who has not yet completed my onboarding
 * When I come back to the website, since my details are stored in local storage
 * I should be redirected back to the onboarding page to complete my profile
 * 
 * As a user who has already completed my 
 */

defineFeature(feature, (test) => {
  let app: App
  let pages: Pages;
  let puppeteerPageDriver: PuppeteerPageDriver;
  let user: CreateUserParams;
  let users: CreateUserParams[];
  let databaseFixture: DatabaseFixture

  test('', () => {
    localStorage = composition.getLocalStorage();
    localStorage.get('user')
  })


  beforeAll(async () => {
    databaseFixture = new DatabaseFixture();
    puppeteerPageDriver = await PuppeteerPageDriver.create({ 
      headless: false,
      slowMo: 50,
    });
    app = createAppObject(puppeteerPageDriver);
    pages = app.pages;
  });

  afterAll(async () => {
    await puppeteerPageDriver.browser.close();
  });

  afterEach(async () => {
    await databaseFixture.resetDatabase();
  });

  // Need to put timeout here.
  jest.setTimeout(60000);

  test('Successful registration with marketing emails accepted', ({ given, when, then, and }) => {

    given('I am a new user', async () => {
      user = new CreateUserBuilder()
        .withAllRandomDetails()
        .build();
      
      await pages.registration.open();
      await pages.registration.acceptMarketingEmails();
    });

    when('I register with valid account details accepting marketing emails', async () => {
      await pages.registration.enterAccountDetails(user);
      await pages.registration.submitRegistrationForm();
    });

    then('I should be granted access to my account', async () => {
      expect(await app.header.getUsernameFromHeader()).toContain(user.username);
    });

    and('I should expect to receive marketing emails', () => {
      // @See backend 
    });
  });


  test('Invalid or missing registration details', ({ given, when, then, and }) => {
    given('I am a new user', async () => {
      user = new CreateUserBuilder()
        .withAllRandomDetails()
        .withEmail('skj')
        .build();
    
      await pages.registration.open();
      await pages.registration.acceptMarketingEmails();
    });

    when('I register with invalid account details', async () => {
      await pages.registration.enterAccountDetails(user);
      await pages.registration.submitRegistrationForm();
    });

    then('I should see an error notifying me that my input is invalid', async () => {
      expect(await app.notifications.getErrorNotificationText()).toBeDefined();
      expect(await app.notifications.getErrorNotificationText()).toContain('invalid');
    });

    and('I should not have been sent access to account details', () => {
      // @See backend 
    });
  });

  test('Account already created with email', ({ given, when, then, and }) => {
    given('a set of users already created accounts', async (table: CreateUserParams[]) => {
      users = table.map((user) => {
        return new CreateUserBuilder()
          .withAllRandomDetails()
          .withEmail(user.email)
          .withFirstName(user.firstName)
          .withLastName(user.lastName)
          .build();
      });

      await databaseFixture.setupWithExistingUsers(users);
      await pages.registration.open();
      await pages.registration.acceptMarketingEmails();
    });
  
    when('new users attempt to register with those emails', async () => {
      await pages.registration.enterAccountDetails(users[0]);
      await pages.registration.submitRegistrationForm();
    });
  
    then('they should see an error notifying them that the account already exists', async () => {
      expect(await app.notifications.getErrorNotificationText()).toBeDefined();
      expect(await app.notifications.getErrorNotificationText()).toContain('in use');
    });

    and('they should not have been sent access to account details', () => {
      // @See backend 
    })
  });
});
