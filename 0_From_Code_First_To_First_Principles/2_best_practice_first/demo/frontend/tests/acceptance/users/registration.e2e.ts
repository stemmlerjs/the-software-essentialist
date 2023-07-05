
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path'
import { PageObject } from '../../shared/pageObject';
import { RegistrationInput, RegistrationPage } from '../../shared/pages/registrationPage';
import { FrontPage } from '../../shared/pages/frontPage';
import { PuppeteerPageDriver } from '../../shared/puppeteerPageDriver';

const feature = loadFeature(path.join(__dirname, '../../../../shared/acceptance/users/registration.feature'));

defineFeature(feature, test => {
  test('Successful registration', ({ given, when, then, and }) => {
    let puppeteerPageDriver: PuppeteerPageDriver;
    let registrationPage: RegistrationPage;
    let frontPage: FrontPage;

    beforeAll(async() => {

      puppeteerPageDriver = await PuppeteerPageDriver.create({ headless: true });
      registrationPage = new RegistrationPage(puppeteerPageDriver);
      frontPage = new FrontPage(puppeteerPageDriver)
    })

    given('I am a new user', () => {
      registrationPage.open();
    });

    when('I register with valid account details', (inputList: RegistrationInput[]) => {
      registrationPage.registerWithAccountDetails(inputList[0]);
    });

    then('I should be granted access to my account', () => {
      expect(registrationPage.isToastVisible()).toBeTruthy();
      expect(registrationPage.isToastSuccessful()).toBeTruthy();
      expect(frontPage.isOnPage()).toBeTruthy();
    });

    and('I should receive an email with login instructions', () => {
      // Can't test this at this level
    });
  });
});