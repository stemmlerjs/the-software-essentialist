
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { sharedTestRoot } from '@dddforum/shared/src/paths';
import { CreateUserCommandBuilder } from '@dddforum/shared/tests/support/builders/createUserCommandBuilder';
import { CreateUserCommand } from '@dddforum/shared/src/api/users';
import { PuppeteerPageDriver } from '../support/driver/puppeteerPageDriver';
import { Pages } from '../support/pages/pages';
import { App, createAppObject } from '../support/pages/app';
import { DatabaseFixture } from '@dddforum/shared/tests/support/fixtures/databaseFixture';

const feature = loadFeature(path.join(sharedTestRoot, 'features/registration.feature'), { tagFilter: '@frontend' });

defineFeature(feature, (test) => {
  let app: App
  let pages: Pages;
  let puppeteerPageDriver: PuppeteerPageDriver;
  let createUserCommand: CreateUserCommand;
  let databaseFixture: DatabaseFixture;

  beforeAll(async () => {
    databaseFixture = new DatabaseFixture();
    puppeteerPageDriver = await PuppeteerPageDriver.create({ 
      headless: false,
      slowMo: 50,
    });
    app = createAppObject(puppeteerPageDriver);
    pages = app.pages;
    await databaseFixture.resetDatabase();
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
      createUserCommand = new CreateUserCommandBuilder()
        .withFirstName('Khalil')
        .withLastName('Stemmler')
        .withRandomUsername()
        .withRandomEmail()
        .build();
    
      await pages.registration.open();
      await pages.registration.acceptMarketingEmails();
    });

    when('I register with valid account details accepting marketing emails', async () => {
      await pages.registration.enterAccountDetails(createUserCommand);
      await pages.registration.submitRegistrationForm();
    });

    then('I should be granted access to my account', async () => {
      expect(await app.header.getUsernameFromHeader()).toContain(createUserCommand.username);
    });

    and('I should expect to receive marketing emails', () => {
      // @See backend
    });
  });

  test('Invalid or missing registration details', ({ given, when, then, and }) => {
    given('I am a new user', async () => {
      createUserCommand = new CreateUserCommandBuilder()
        .withFirstName('k')
        .withLastName('s')
        .withRandomUsername()
        .withEmail('skj')
        .build();
    
      await pages.registration.open();
      await pages.registration.acceptMarketingEmails();
    });

    when('I register with invalid account details', async () => {
      await pages.registration.enterAccountDetails(createUserCommand);
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

  test.only('Account already created w/ email', ({ given, when, then }) => {
    given('I have already created an account using some email', async () => {
      // create the user already using a database fixture
      createUserCommand = new CreateUserCommandBuilder()
        .withFirstName('Khalil')
        .withLastName('Stemmler')
        .withRandomUsername()
        .withEmail("john@example.com")
        .build();
      await databaseFixture.setupWithExistingUsers([createUserCommand]);
      await pages.registration.open();
      await pages.registration.acceptMarketingEmails();
    });
  
    when('I attempt to register with this email', async () => {
      await pages.registration.enterAccountDetails(createUserCommand);
      await pages.registration.submitRegistrationForm();
    });
  
    then('I should see an error notifying me that the account already exists', async () => {
      expect(await app.notifications.getErrorNotificationText()).toBeDefined();
      expect(await app.notifications.getErrorNotificationText()).toContain('exists');
    });
  });
});
