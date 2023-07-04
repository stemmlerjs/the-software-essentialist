
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path'
import { BrowserDriver } from '../../shared/browserDriver';
import { RegistrationPage } from '../../shared/pages/registrationPage';
import { FrontPage } from '../../shared/pages/frontPage';

const feature = loadFeature(path.join(__dirname, '../../../../shared/acceptance/users/registration.feature'));

defineFeature(feature, test => {
  test('Successful registration', ({ given, when, then, and }) => {
    let browserDriver: BrowserDriver;
    let registrationPage: RegistrationPage;
    let frontPage: FrontPage;

    beforeAll(async() => {
      browserDriver = await BrowserDriver.create({ headless: false });
      registrationPage = new RegistrationPage(browserDriver);
      frontPage = new FrontPage(browserDriver);
    })

    given('I am a new user', () => {
      registrationPage.open();
    });

    when('I register with valid account details', (table) => {
      registrationPage.registerWithAccountDetails();
    });

    then('I should be granted access to my account', () => {
      registrationPage.expectToHaveSeenSuccessToast();
      frontPage.expectToHaveNavigatedHere();
    });

    and('I should receive an email with login instructions', () => {
      // Can't test this at this level
    });
  });
});