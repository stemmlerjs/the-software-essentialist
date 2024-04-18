
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { sharedTestRoot } from '@dddforum/shared/src/paths';
import { CreateUserCommandBuilder } from '@dddforum/shared/tests/support/builders/createUserCommandBuilder';
import { CreateUserCommand } from '@dddforum/shared/src/api/users';
import { CompositionRoot } from '@dddforum/backend/src/shared/composition/compositionRoot';
import { Errors } from '@dddforum/backend/src/shared/errors/errors';
import { Application } from '@dddforum/backend/src/shared/application/applicationInterface';
import { DatabaseFixture } from '@dddforum/shared/tests/support/fixtures/databaseFixture';
import { TransactionalEmailAPISpy } from '../../../src/modules/marketing/adapters/transactionalEmailAPI/transactionalEmailAPISpy';
import { ContactListAPISpy } from '../../../src/modules/marketing/adapters/contactListAPI/contactListSpy';

const feature = loadFeature(path.join(sharedTestRoot, 'features/registration.feature'), { tagFilter: '@backend' });

defineFeature(feature, (test) => {

  let createUserCommand: CreateUserCommand;
  let createUserResponse: any;
  let addEmailToListResponse: boolean | undefined;
  let composition: CompositionRoot;
  let transactionalEmailAPISpy: TransactionalEmailAPISpy;
  let contactListAPISpy: ContactListAPISpy;
  let commands: CreateUserCommand[] = [];
  let createUserResponses: any[] = [];
  let application: Application;
  let databaseFixture: DatabaseFixture;

  beforeAll(async () => {
    composition = CompositionRoot.createCompositionRoot('development');
    application = composition.getApplication();
    contactListAPISpy = composition.getContactListAPI() as ContactListAPISpy;
    transactionalEmailAPISpy = composition.getTransactionalEmailAPI() as TransactionalEmailAPISpy;
    databaseFixture = new DatabaseFixture(composition);
  })

  afterEach(() => {
    contactListAPISpy.reset();
    transactionalEmailAPISpy.reset();
    commands = [];
    createUserResponses = []
    addEmailToListResponse = undefined;
  });

  test('Successful registration with marketing emails accepted', ({ given, when, then, and }) => {

    given('I am a new user', async () => {
      createUserCommand = new CreateUserCommandBuilder()
        .withFirstName('Khalil')
        .withLastName('Stemmler')
        .withRandomUsername()
        .withRandomEmail()
        .build();
    });

    when('I register with valid account details accepting marketing emails', async () => {
      createUserResponse = await application.user.createUser(createUserCommand);
      addEmailToListResponse = await application.marketing.addEmailToList(createUserCommand.email);
    });

    then('I should be granted access to my account', async () => {
      const { data, success, error } = createUserResponse;

      // Expect a successful response (Result Verification)
      expect(success).toBeTruthy();
      expect(error).toBeFalsy();
      expect(data.id).toBeDefined();
      expect(data.email).toEqual(createUserCommand.email);
      expect(data.firstName).toEqual(createUserCommand.firstName);
      expect(data.lastName).toEqual(createUserCommand.lastName);
      expect(data.username).toEqual(createUserCommand.username);

      // And the user exists (State Verification)
      const getUserResponse = await application.user.getUserByEmail({ email: createUserCommand.email });
      expect(createUserCommand.email).toEqual(getUserResponse.data && getUserResponse.data.email);

      // Verify that an email has been sent (Communication Verification)
      expect(transactionalEmailAPISpy.getTimesMethodCalled('sendMail')).toEqual(1);
    });

    and('I should expect to receive marketing emails', () => {
      // How can we test this? what do we want to place under test?
      // Well, what's the tool they'll use? mailchimp?
      // And do we want to expect that mailchimp is going to get called to add
      // a new contact to a list? Yes, we do. But we're not going to worry 
      // about this yet because we need to learn how to validate this without
      // filling up a production Mailchimp account with test data. 

      expect(addEmailToListResponse).toBeTruthy();
      expect(contactListAPISpy.getTimesMethodCalled('addEmailToList')).toEqual(1);
    });
  });

  test('Successful registration without marketing emails accepted', ({ given, when, then, and }) => {
    given('I am a new user', () => {
      createUserCommand = new CreateUserCommandBuilder()
        .withFirstName('Khalil')
        .withLastName('Stemmler')
        .withRandomUsername()
        .withRandomEmail()
        .build();
    });

    when('I register with valid account details declining marketing emails', async () => {
      createUserResponse = await application.user.createUser(createUserCommand);
    });

    then('I should be granted access to my account', async () => {
      const { data, success, error } = createUserResponse

      // Expect a successful response (Result Verification)
      expect(success).toBeTruthy();
      expect(error).toBeFalsy();
      expect(data.id).toBeDefined();
      expect(data.email).toEqual(createUserCommand.email);
      expect(data.firstName).toEqual(createUserCommand.firstName);
      expect(data.lastName).toEqual(createUserCommand.lastName);
      expect(data.username).toEqual(createUserCommand.username);

      // And the user exists (State Verification)
      const getUserResponse = await application.user.getUserByEmail({ email: createUserCommand.email });
      expect(createUserCommand.email).toEqual(getUserResponse.data && getUserResponse.data.email);

      // Verify that an email has been sent (Communication Verification)
      expect(transactionalEmailAPISpy.getTimesMethodCalled('sendMail')).toEqual(1);
    });

    and('I should not expect to receive marketing emails', () => {
      expect(addEmailToListResponse).toBeFalsy();
      expect(contactListAPISpy.getTimesMethodCalled('addEmailToList')).toEqual(0);
    });
  });

  test('Invalid or missing registration details', ({ given, when, then, and }) => {
    given('I am a new user', () => {
      createUserCommand = new CreateUserCommandBuilder()
        .withFirstName('Khalil')
        .withLastName('')
        .withRandomUsername()
        .withRandomEmail()
        .build();
    });

    when('I register with invalid account details', async () => {
      createUserResponse = await application.user.createUser(createUserCommand);
    });

    then('I should see an error notifying me that my input is invalid', async () => {
      const { success, error } = createUserResponse;

      // Expect a failure response (Result Verification)
      expect(success).toBeFalsy();
      expect(error).toBeDefined();

      // And the user does not exist (State Verification)
      const getUserResponse = await application.user.getUserByEmail({ email: createUserCommand.email });
      expect(getUserResponse.error).toBeDefined();
      expect(getUserResponse.error).toEqual(Errors.UserNotFound)

    });

    and('I should not have been sent access to account details', () => {
      expect(transactionalEmailAPISpy.getTimesMethodCalled('sendMail')).toEqual(0);
    });
  });

  test('Account already created w/ email', ({ given, when, then, and }) => {
    given('a set of users already created accounts', async (table) => {
      table.forEach((item: any) => {
        commands.push(new CreateUserCommandBuilder()
          .withFirstName(item.firstName)
          .withLastName(item.lastName)
          .withEmail(item.email)
          .withRandomUsername()
          .build()
        )
      })

      await databaseFixture.setupWithExistingUsers(commands);
      transactionalEmailAPISpy.reset();
    });

    when('new users attempt to register with those emails', async () => {
      for (let command of commands) {
        let response = await application.user.createUser(command);
        createUserResponses.push(response);
      }
    });

    then('they should see an error notifying them that the account already exists', async () => {
      for (let response of createUserResponses) {
        const { success, error } = response;

        // Expect a failure response (Result Verification)
        expect(success).toBeFalsy();
        expect(error).toBeDefined();
        expect(error).toEqual(Errors.EmailAlreadyInUse);
      }
    });

    and('they should not have been sent access to account details', () => {
      expect(transactionalEmailAPISpy.getTimesMethodCalled('sendMail')).toEqual(0);
    });
  });

  test('Username already taken', ({ given, when, then, and }) => {

    given('a set of users have already created their accounts with valid details', async (table) => {
      table.forEach((item: any) => {
        commands.push(new CreateUserCommandBuilder()
          .withFirstName(item.firstName)
          .withLastName(item.lastName)
          .withUsername(item.username)
          .withRandomEmail()
          .build()
        )
      });
      
      await databaseFixture.setupWithExistingUsers(commands);
      transactionalEmailAPISpy.reset();
    });

    when('new users attempt to register with already taken usernames', async (table) => {
      for (let item of table) {
        let response = await application.user.createUser(item);
        createUserResponses.push(response);
      }
    });

    then('they see an error notifying them that the username has already been taken', () => {
      for (let response of createUserResponses) {
        const { success, error } = response;

        // Expect a failure response (Result Verification)
        expect(success).toBeFalsy();
        expect(error).toBeDefined();
        expect(error).toEqual(Errors.UsernameAlreadyTaken);
      }
    });

    and('they should not have been sent access to account details', () => {
      expect(transactionalEmailAPISpy.getTimesMethodCalled('sendMail')).toEqual(0);
    });
  });
});
