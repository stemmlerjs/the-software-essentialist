
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { sharedTestRoot } from '@dddforum/shared/src/paths';
import { CreateUserCommandBuilder } from '@dddforum/shared/tests/support/builders/createUserCommandBuilder';
import { APIResponse, createAPIClient } from '@dddforum/shared/src/api';
import { CreateUserCommand } from '@dddforum/shared/src/api/users';
import { CompositionRoot } from '@dddforum/backend/src/shared/composition/compositionRoot';
import { WebServer } from '@dddforum/backend/src/shared/http/webServer';
import { EmailServiceSpy } from '@dddforum/backend/src/modules/email/emailServiceSpy';
import { MarketingServiceSpy } from '@dddforum/backend/src/modules/marketing/marketingServiceSpy';
import { DatabaseFixture } from '@dddforum/shared/tests/support/fixtures/databaseFixture';
import { DBConnection } from '@dddforum/backend/src/shared/database/database';
import { Errors } from '@dddforum/backend/src/shared/errors/errors';

const feature = loadFeature(path.join(sharedTestRoot, 'features/registration.feature'), { tagFilter: '@backend' });

defineFeature(feature, (test) => {

  let apiClient = createAPIClient('http://localhost:3000');
  let createUserCommand: CreateUserCommand;
  let createUserResponse: any;
  let addEmailToListResponse: any;
  let composition: CompositionRoot;
  let server: WebServer;
  let emailServiceSpy: EmailServiceSpy;
  let marketingServiceSpy: MarketingServiceSpy;
  let dbConnection: DBConnection;
  let commands: CreateUserCommand[] = [];
  let createUserResponses: APIResponse[] = [];
  let databaseFixture: DatabaseFixture;

  beforeAll(async () => {
    composition = CompositionRoot.createCompositionRoot('test');
    emailServiceSpy = composition.getEmailService() as EmailServiceSpy;
    marketingServiceSpy = composition.getMarketingService() as MarketingServiceSpy;
    server = composition.getWebServer();
    dbConnection = composition.getDBConnection();
    databaseFixture = new DatabaseFixture(composition);

    await server.start();
    await dbConnection.connect();
  })

  afterEach(() => {
    emailServiceSpy.reset();
    marketingServiceSpy.reset();
    commands = [];
    createUserResponses = []
  })

  afterAll(async () => {
    await server.stop();
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
      createUserResponse = await apiClient.users.register(createUserCommand);
      addEmailToListResponse = await apiClient.marketing.addEmailToList(createUserCommand.email);
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
      const getUserResponse = await apiClient.users.getUserByEmail({ email: createUserCommand.email });
      expect(createUserCommand.email).toEqual(getUserResponse.data.email);

      // Verify that an email has been sent (Communication Verification)
      expect(emailServiceSpy.getTimesMethodCalled('sendMail')).toEqual(1);
    });

    and('I should expect to receive marketing emails', () => {
      // How can we test this? what do we want to place under test?
      // Well, what's the tool they'll use? mailchimp?
      // And do we want to expect that mailchimp is going to get called to add
      // a new contact to a list? Yes, we do. But we're not going to worry 
      // about this yet because we need to learn how to validate this without
      // filling up a production Mailchimp account with test data. 
      const { success } = addEmailToListResponse

      expect(success).toBeTruthy();
      expect(marketingServiceSpy.getTimesMethodCalled('addEmailToList')).toEqual(1);
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
      createUserResponse = await apiClient.users.register(createUserCommand);
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
      const getUserResponse = await apiClient.users.getUserByEmail({ email: createUserCommand.email });
      expect(createUserCommand.email).toEqual(getUserResponse.data.email);

      // Verify that an email has been sent (Communication Verification)
      expect(emailServiceSpy.getTimesMethodCalled('sendMail')).toEqual(1);
    });

    and('I should not expect to receive marketing emails', () => {
      const { success } = addEmailToListResponse

      expect(success).toBeTruthy();
      expect(marketingServiceSpy.getTimesMethodCalled('addEmailToList')).toEqual(0);
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
      createUserResponse = await apiClient.users.register(createUserCommand);
    });

    then('I should see an error notifying me that my input is invalid', async () => {
      const { success, error } = createUserResponse;

      // Expect a failure response (Result Verification)
      expect(success).toBeFalsy();
      expect(error).toBeDefined();

      // And the user does not exist (State Verification)
      const getUserResponse = await apiClient.users.getUserByEmail({ email: createUserCommand.email });
      expect(getUserResponse.error).toBeDefined();
      expect(getUserResponse.error).toEqual(Errors.UserNotFound)

    });

    and('I should not have been sent access to account details', () => {
      expect(emailServiceSpy.getTimesMethodCalled('sendMail')).toEqual(0);
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
      emailServiceSpy.reset();
    });

    when('new users attempt to register with those emails', async () => {
      for (let command of commands) {
        let response = await apiClient.users.register(command);
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
      expect(emailServiceSpy.getTimesMethodCalled('sendMail')).toEqual(0);
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
      emailServiceSpy.reset();
    });

    when('new users attempt to register with already taken usernames', async (table) => {
      for (let item of table) {
        let response = await apiClient.users.register(item);
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
      expect(emailServiceSpy.getTimesMethodCalled('sendMail')).toEqual(0);
    });
  });
});
