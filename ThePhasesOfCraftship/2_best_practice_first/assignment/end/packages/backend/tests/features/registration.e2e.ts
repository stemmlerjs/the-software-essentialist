
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { sharedTestRoot } from '@dddforum/shared/src/paths';
import { UserBuilder } from '@dddforum/shared/tests/support/builders/userBuilder';
import { createAPIClient } from '@dddforum/shared/src/api';
import { CreateUserCommand } from '@dddforum/shared/src/api/users';
import { CompositionRoot } from '@dddforum/backend/src/shared/composition/compositionRoot';

import * as emailService from '../../../backend/src/modules/email/mail';

jest.mock('../../../backend/src/modules/email/mail');

//@ts-ignore
emailService.sendMail.mockImplementation(({
  to,
  subject,
  text
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  // Mock logic for sending email
  console.log(`Mock email sent to ${to}: ${subject} - ${text}`);
});

const feature = loadFeature(path.join(sharedTestRoot, 'features/registration.feature'));

defineFeature(feature, (test) => {

  let apiClient = createAPIClient('http://localhost:3000');
  let createUserCommand: CreateUserCommand;
  let createUserResponse: any;
  let composition = new CompositionRoot();
  let server = composition.getWebServer();


  test('Successful registration with marketing emails accepted', ({ given, when, then, and }) => {

    beforeAll(async () => {
      await server.start();
    })

    afterAll(async () => {
      await server.stop();
    });
  
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
      createUserResponse = await apiClient.users.register(createUserCommand);
    });

    then('I should be granted access to my account', async () => {
      const { data, success } = createUserResponse.data
      const responseData = data;

      // Expect a successful response (Result Verification)
      expect(success).toBeTruthy();
      expect(responseData.error).toBeFalsy();
      expect(responseData.id).toBeDefined();
      expect(responseData.email).toEqual(createUserCommand.email);
      expect(responseData.firstName).toEqual(createUserCommand.firstName);
      expect(responseData.lastName).toEqual(createUserCommand.lastName);
      expect(responseData.username).toEqual(createUserCommand.username);

      // And the user exists (State Verification)
      const getUserResponse = await apiClient.users.getUserByEmail({ email: createUserCommand.email });
      expect(createUserCommand.email).toEqual(getUserResponse.data.data.email);

      // Verify that an email has been sent (Communication Verification)
      expect(emailService.sendMail).toHaveBeenCalled();
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
