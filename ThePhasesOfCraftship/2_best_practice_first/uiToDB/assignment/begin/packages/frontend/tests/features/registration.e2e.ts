
import { defineFeature, loadFeature } from 'jest-cucumber';
import { sharedTestRoot } from '@dddforum/shared/src/paths';
import { CreateUserParams } from "@dddforum/shared/src/api/users";

import * as path from 'path';
import { DatabaseFixture } from '@dddforum/shared/tests/support/fixtures/databaseFixture';

const feature = loadFeature(path.join(sharedTestRoot, 'features/registration.feature'), { tagFilter: '@frontend' });


defineFeature(feature, (test) => {
  let databaseFixture: DatabaseFixture


  beforeAll(async () => {
    databaseFixture = new DatabaseFixture();
  });

  afterAll(async () => {
  });

  afterEach(async () => {
    await databaseFixture.resetDatabase();
  });

  // Need to put timeout here.
  jest.setTimeout(60000);

  test('Successful registration with marketing emails accepted', ({ given, when, then, and }) => {

    given('I am a new user', async () => {
    });

    when('I register with valid account details accepting marketing emails', async () => {
    });

    then('I should be granted access to my account', async () => {
    });

    and('I should expect to receive marketing emails', () => {
      // @See backend 
    });
  });


  test('Invalid or missing registration details', ({ given, when, then, and }) => {
    given('I am a new user', async () => {
    });

    when('I register with invalid account details', async () => {
    });

    then('I should see an error notifying me that my input is invalid', async () => {
    });

    and('I should not have been sent access to account details', () => {
      // @See backend 
    });
  });

  test('Account already created with email', ({ given, when, then, and }) => {
    given('a set of users already created accounts', async (table: CreateUserParams[]) => {
    });

  
    when('new users attempt to register with those emails', async () => {
    });
  
    then('they should see an error notifying them that the account already exists', async () => {
    });

    and('they should not have been sent access to account details', () => {
      // @See backend 
    })
  });
});
