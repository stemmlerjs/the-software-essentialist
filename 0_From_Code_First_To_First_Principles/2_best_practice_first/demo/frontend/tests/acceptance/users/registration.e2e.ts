import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path'

const feature = loadFeature(path.join(__dirname, '../../../../shared/acceptance/users/registration.feature'));

defineFeature(feature, test => {
  test('Successful registration', ({ given, when, then, and }) => {
    given('I am a new user', () => {

    });

    when('I register with valid account details', (table) => {

    });

    then('I should be granted access to my account', () => {

    });

    and('I should receive an email with login instructions', () => {

    });
  });
});