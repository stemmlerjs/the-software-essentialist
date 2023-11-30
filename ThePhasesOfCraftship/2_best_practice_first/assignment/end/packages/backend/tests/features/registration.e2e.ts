
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { sharedTestRoot } from '@dddforum/shared/src/paths';
import { UserBuilder } from '@dddforum/shared/tests/support/builders/userBuilder';
import { createAPI } from '@dddforum/shared/src/api';
import { CreateUserCommand } from '@dddforum/shared/src/api/users';
import { startServer, stopServer } from '@dddforum/backend/src/bootstrap';

const feature = loadFeature(path.join(sharedTestRoot, 'features/registration.feature'));

defineFeature(feature, (test) => {

  let api = createAPI('http://localhost:3000');

  test('Successful registration with marketing emails accepted', ({ given, when, then, and }) => {

    let createUserCommand: CreateUserCommand;
    let createUserResponse: any;

    beforeAll(async () => {
      await startServer();
    })

    afterAll(async () => {
      await stopServer();
    })

  
    given('I am a new user', async () => {
      createUserCommand = new UserBuilder()
        .withFirstName('Khalil')
        .withLastName('Stemmler')
        .withRandomUsername()
        .withRandomEmail()
        .build();
    });

    and('I would like to receive marketing emails', () => {

    });

    when('I register with valid account details', async () => {
      createUserResponse = await api.users.register(createUserCommand)
    });

    then('I should be granted access to my account', async () => {
      // Expect a successful response
      const { data, success } = createUserResponse.data
      const responseData = data;

      expect(success).toBeTruthy();
      expect(responseData.error).toBeFalsy();
      expect(responseData.id).toBeDefined();
      expect(responseData.email).toEqual(createUserCommand.email);
      expect(responseData.firstName).toEqual(createUserCommand.firstName);
      expect(responseData.lastName).toEqual(createUserCommand.lastName);
      expect(responseData.username).toEqual(createUserCommand.username);

      // And the user exists
      const getUserResponse = await api.users.getUserByEmail({ email: createUserCommand.email });
      expect(createUserCommand.email).toEqual(getUserResponse.data.data.email);
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
