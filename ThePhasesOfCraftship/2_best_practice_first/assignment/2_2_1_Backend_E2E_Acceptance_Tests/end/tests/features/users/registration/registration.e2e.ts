
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { UserBuilder } from '../../../support/builders/userBuilder';
import { CreateUserInput } from '../../../../src/modules/users/userDTOs';
import { RESTfulAPIClient } from '../../../../src/shared/api/restfulAPIClient'
import { AxiosResponse } from 'axios';

const feature = loadFeature(path.join(__dirname, './registration.feature'));

defineFeature(feature, (test) => {
  test('Successful registration', ({ given, when, then, and }) => {

    let createUserInput: CreateUserInput;
    let restfulAPIClient: RESTfulAPIClient = new RESTfulAPIClient();
    let response: AxiosResponse;


    given('I am a new user', async () => {
      createUserInput = new UserBuilder()
        .withFirstName('Khalil')
        .withLastName('Stemmler')
        .withUsername('stemmlerjs')
        .withRandomEmail()
        .build();
    });

    when('I register with valid account details', async () => {
      response = await restfulAPIClient.post('/users/new', createUserInput);
    });

    then('I should be granted access to my account', async () => {
      expect(response.data.success).toBeTruthy();
      expect(response.data.error).toBeFalsy();
      expect(response.data.data.id).toBeDefined();
      expect(response.data.data.email).toEqual(createUserInput.email);
      expect(response.data.data.firstName).toEqual(createUserInput.firstName);
      expect(response.data.data.lastName).toEqual(createUserInput.lastName);
      expect(response.data.data.username).toEqual(createUserInput.username);
    });

    and('I should receive an email with login instructions', () => {
      /**
       * I know the way most folks will do this is to use a mailservice at the end 
       * of createUser or something like that. in this case, the only way for us 
       * to test using this technique would be to perform Communication 
       * Verification — but I haven’t taught you this yet.
       * 
       * There are other ways we can verify this as well, especially once I 
       * teach you Temporal Decoupling properly in Pattern-First.
       * 
       * For now, let’s leave this assert until we have the appropriate 
       * event-based infrastructure to deal with this.
       */
    });

    // afterAll(async () => {
    //   await server.stop();
    // });
  });
});
