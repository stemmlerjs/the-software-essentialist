
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { sharedTestRoot } from '@dddforum/shared/src/paths';
import { CreateUserCommandBuilder } from '@dddforum/shared/tests/support/builders/createUserCommandBuilder';
import { CreateUserCommand } from '@dddforum/shared/src/api/users';
import { PuppeteerPageDriver } from '../support/driver/puppeteerPageDriver';
import { Pages } from '../support/pages/pages';
import { App, createAppObject } from '../support/pages/app';

const feature = loadFeature(path.join(sharedTestRoot, 'features/registration.feature'), { tagFilter: '@frontend' });

defineFeature(feature, (test) => {
  test('Successful registration with marketing emails accepted', ({ given, when, then, and }) => {
    let app: App
    let pages: Pages;
    let puppeteerPageDriver: PuppeteerPageDriver;
    let createUserCommand: CreateUserCommand;

    beforeAll(async () => {
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
  
    // Need to put timeout here.
    jest.setTimeout(60000);
    
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
});
