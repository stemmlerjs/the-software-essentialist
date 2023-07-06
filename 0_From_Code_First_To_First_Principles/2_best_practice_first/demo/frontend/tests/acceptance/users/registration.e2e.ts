
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path'
import { RegistrationInput, RegistrationPage } from '../../shared/pages/registrationPage/registrationPage';
import { FrontPage } from '../../shared/pages/frontPage/frontPage';
import { PuppeteerPageDriver } from '../../shared/puppeteerPageDriver';
import { UserBuilder } from '../../shared/builders/userBuilder';

const feature = loadFeature(path.join(__dirname, '../../../../shared/acceptance/users/registration.feature'));

defineFeature(feature, test => {
  test('Successful registration', ({ given, when, then, and }) => {
    let puppeteerPageDriver: PuppeteerPageDriver;
    let registrationPage: RegistrationPage;
    let frontPage: FrontPage;
    let registerUserProps: RegistrationInput;

    beforeAll(async() => {
      puppeteerPageDriver = await PuppeteerPageDriver.create({ headless: false, devtools: true });
      registrationPage = new RegistrationPage(puppeteerPageDriver);
      frontPage = new FrontPage(puppeteerPageDriver)
    })

    afterAll(async () => {
      // await puppeteerPageDriver.browser.close();
    })


    given('I am a new user', async () => {
      registerUserProps = new UserBuilder()
        .withFirstName('Khalil')
        .withLastName('Stemmler')
        .withUsername('stemmlerjs')
        .withRandomEmail()
        .build();
        
      await registrationPage.open();
    });

    when('I register with valid account details', async () => {
      await registrationPage.registerWithAccountDetails(registerUserProps);
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