
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { sharedTestRoot } from '@dddforum/shared/src/paths';
import { UserBuilder } from '@dddforum/shared/tests/support/builders/userBuilder';
import { CreateUserCommand } from '@dddforum/shared/src/api/users';
import { PuppeteerPageDriver } from '../support/driver/puppeteerPageDriver';
import { Pages } from '../support/pages/pages';
import { App, createAppObject } from '../support/pages/app';

const feature = loadFeature(path.join(sharedTestRoot, 'features/registration.feature'));

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
      createUserCommand = new UserBuilder()
        .withFirstName('Khalil')
        .withLastName('Stemmler')
        .withRandomUsername()
        .withRandomEmail()
        .build();
    
      await pages.registration.open();
    });

    when('I register with valid account details', async () => {
      await pages.registration.enterAccountDetails(createUserCommand);
    });

    and('I have accepted marketing emails', async () => {
      await pages.registration.acceptMarketingEmails();
      await pages.registration.submitRegistrationForm();
    });

    then('I should be granted access to my account', async () => {
      expect(await app.header.getUsernameFromHeader()).toContain(createUserCommand.username);
    });

    and('I should expect to receive marketing emails', () => {
      // How can we test this? what do we want to place under test?
      // Well, what's the tool they'll use? mailchimp?
      // And do we want to expect that mailchimp is going to get called to add
      // a new contact to a list? Yes, we do. But we're not going to worry 
      // about this yet because we need to learn how to validate this without
      // filling up a production Mailchimp account with test data. We will hook
      // up how to handle this in Pattern-First.
    });
  });
});
