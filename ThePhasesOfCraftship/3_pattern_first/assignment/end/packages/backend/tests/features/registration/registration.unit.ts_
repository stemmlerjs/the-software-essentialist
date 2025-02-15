
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { sharedTestRoot } from '@dddforum/shared/src/paths';
import { CreateUserCommand } from '../../../src/modules/users/usersCommand';
import { CompositionRoot } from '../../../src/shared/compositionRoot';
import { TransactionalEmailAPISpy } from '../../../src/modules/notifications/adapters/transactionalEmailAPI/transactionalEmailAPISpy';
import { ContactListAPISpy } from '../../../src/modules/marketing/adapters/contactListAPI/contactListSpy';
import { Application } from '../../../src/shared/application/applicationInterface';
import { InMemoryUserRepositorySpy } from '../../../src/modules/users/adapters/inMemoryUserRepositorySpy';
import { Config } from '../../../src/shared/config';
import { UserBuilder } from "@dddforum/shared/tests/support/builders/users";
import { DatabaseFixture } from '@dddforum/shared/tests/support/fixtures/databaseFixture';
import { CreateUserParams } from '@dddforum/shared/src/api/users';

const feature = loadFeature(path.join(sharedTestRoot, 'features/registration.feature'), { tagFilter: '@backend' });

defineFeature(feature, (test) => {
  let createUserCommand: CreateUserCommand;
  let createUserResponse: any;
  let addEmailToListResponse: boolean | undefined;
  let composition: CompositionRoot;
  let transactionalEmailAPISpy: TransactionalEmailAPISpy;
  let contactListAPISpy: ContactListAPISpy;
  let application: Application;
  let userRepoSpy: InMemoryUserRepositorySpy;
  let commands: CreateUserCommand[] = [];
  let createUserResponses: any[] = [];
  let databaseFixture: DatabaseFixture;

  beforeAll(async () => {
    composition = CompositionRoot.createCompositionRoot(new Config('test:unit'));
    application = composition.getApplication();
    contactListAPISpy = composition.getContactListAPI() as ContactListAPISpy;
    transactionalEmailAPISpy = composition.getTransactionalEmailAPI() as TransactionalEmailAPISpy;
    userRepoSpy = composition.getRepositories().users as InMemoryUserRepositorySpy;
    createUserResponses = []
    databaseFixture = new DatabaseFixture(composition);
  })

  afterEach(async () => {
    contactListAPISpy.reset();
    transactionalEmailAPISpy.reset();
    commands = [];
    createUserResponses = [];
    addEmailToListResponse = undefined;
    await userRepoSpy.reset();
  });

  test('Successful registration with marketing emails accepted', ({ given, when, then, and }) => {
    given('I am a new user', async () => {
      createUserCommand = new UserBuilder().makeCreateUserCommandBuilder()
        .withAllRandomDetails()
        .withFirstName('Khalil')
        .withLastName('Stemmler')
        .buildCommand();
    });

    when('I register with valid account details accepting marketing emails', async () => {
      createUserResponse = await application.users.createUser(createUserCommand);
      addEmailToListResponse = await application.marketing.addEmailToList(createUserCommand.email);
    });

    then('I should be granted access to my account', async () => {
      expect(createUserResponse.id).toBeDefined();
      expect(createUserResponse.email).toEqual(createUserCommand.email);
      expect(createUserResponse.firstName).toEqual(createUserCommand.firstName);
      expect(createUserResponse.lastName).toEqual(createUserCommand.lastName);
      expect(createUserResponse.username).toEqual(createUserCommand.username);
      
      // And the user exists (State Verification)
      const getUserResponse = await application.users.getUserByEmail(createUserCommand.email);
      expect(createUserCommand.email).toEqual(getUserResponse.email);

      expect(userRepoSpy.getTimesMethodCalled('save')).toEqual(1);

      // Verify that an email has been sent (Communication Verification)
      expect(transactionalEmailAPISpy.getTimesMethodCalled('sendMail')).toEqual(1);
    })

    and('I should expect to receive marketing emails', () => {
      expect(addEmailToListResponse).toBeTruthy();
      expect(contactListAPISpy.getTimesMethodCalled('addEmailToList')).toEqual(1);
    });
  })

  test('Successful registration without marketing emails accepted', ({ given, when, then, and }) => {
    given('I am a new user', () => {
      createUserCommand = new UserBuilder().makeCreateUserCommandBuilder()
        .withAllRandomDetails()
        .withFirstName('Khalil')
        .withLastName('Stemmler')
        .buildCommand()
    })


    when('I register with valid account details declining marketing emails', async () => {
      createUserResponse = await application.users.createUser(createUserCommand);
    });

    then('I should be granted access to my account', async () => {
      expect(createUserResponse.id).toBeDefined();
      expect(createUserResponse.email).toEqual(createUserCommand.email);
      expect(createUserResponse.firstName).toEqual(createUserCommand.firstName);
      expect(createUserResponse.lastName).toEqual(createUserCommand.lastName);
      expect(createUserResponse.username).toEqual(createUserCommand.username);

      expect(userRepoSpy.getTimesMethodCalled('save')).toEqual(1);

      // And the user exists (State Verification)
      const getUserResponse = await application.users.getUserByEmail(createUserCommand.email);
      expect(createUserCommand.email).toEqual(getUserResponse.email);
      

      // Verify that an email has been sent (Communication Verification)
      expect(transactionalEmailAPISpy.getTimesMethodCalled('sendMail')).toEqual(1);
    });

    and('I should not expect to receive marketing emails', () => {
      expect(addEmailToListResponse).toBeFalsy();
      expect(contactListAPISpy.getTimesMethodCalled('addEmailToList')).toEqual(0);
    });
  });

  test('Invalid or missing registration details', ({ given, when, then, and }) => {
      let params: CreateUserParams; 
      let error: any; 
      given('I am a new user', () => {
        params = new UserBuilder().makeCreateUserCommandBuilder()
          .withAllRandomDetails()
          .withLastName('')
          .build();
      });
  
      when('I register with invalid account details', async () => {
        try {
          createUserCommand = CreateUserCommand.fromProps(params);
          await application.users.createUser(createUserCommand);
        } catch (e) {
          error = e;
        }
      });
  
    then('I should see an error notifying me that my input is invalid', async () => {
      expect(userRepoSpy.getTimesMethodCalled('save')).toEqual(0);
      expect(error).toBeDefined();
    });

    and('I should not have been sent access to account details', () => {
      expect(transactionalEmailAPISpy.getTimesMethodCalled('sendMail')).toEqual(0);
    });
  });

  test('Username already taken', ({ given, when, then, and }) => {
    given('a set of users have already created their accounts with valid details', async (table) => {
      table.forEach((item: any) => {
          commands.push(new UserBuilder().makeCreateUserCommandBuilder()
          .withFirstName(item.firstName)
          .withLastName(item.lastName)
          .withUsername(item.username)
          .withEmail(item.email)
          .buildCommand()
        )
      });
      await databaseFixture.setupWithExistingUsersFromCommands(commands);
      transactionalEmailAPISpy.reset();
    });

    when('new users attempt to register with already taken usernames', async (table) => {
      for (const item of table) {
        const response = application.users.createUser(item);
        createUserResponses.push(response);
      }
    });

    then('they see an error notifying them that the username has already been taken', () => {
      for (const response of createUserResponses) {
        expect(response).rejects.toThrow(expect.objectContaining({
          type: 'UsernameAlreadyTakenException'
        }));
      }
    });

    and('they should not have been sent access to account details', () => {
      expect(transactionalEmailAPISpy.getTimesMethodCalled('sendMail')).toEqual(0);
    });
  });

  test('Account already created with email', ({ given, when, then, and }) => {
    given('a set of users already created accounts', async (table) => {
      table.forEach((item: any) => {
        commands.push(new UserBuilder().makeCreateUserCommandBuilder()
          .withUsername(item.username)
          .withFirstName(item.firstName)
          .withLastName(item.lastName)
          .withEmail(item.email)
          .buildCommand()
          );
      })
      await databaseFixture.setupWithExistingUsersFromCommands(commands);
      transactionalEmailAPISpy.reset();
    });

    when('new users attempt to register with those emails', async () => {
      for (const command of commands) {
        const response = application.users.createUser(command);
        createUserResponses.push(response);
      }
    });

    then('they should see an error notifying them that the account already exists', async () => {
      for (const response of createUserResponses) {
        expect(response).rejects.toThrow(expect.objectContaining({
          type: 'EmailAlreadyInUseException'
        }));
      }
    });

    and('they should not have been sent access to account details', () => {
      expect(transactionalEmailAPISpy.getTimesMethodCalled('sendMail')).toEqual(0);
    });
  });
})
