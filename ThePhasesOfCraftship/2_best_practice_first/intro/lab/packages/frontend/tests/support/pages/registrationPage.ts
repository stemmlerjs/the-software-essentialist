
import { CreateUserCommand } from "@dddforum/shared/src/api";
import { PageElements } from "../components/component";
import { PuppeteerPageDriver } from "../driver/puppeteerPageDriver";
import { PageObject } from "./pageObject";

export class RegistrationPage extends PageObject {
  
  private elements: PageElements;

  constructor (driver: PuppeteerPageDriver) {
    super(driver, 'http://localhost:4000/join');
    this.elements = new PageElements({
      email: { selector: '.registration.email', type: 'input' },
      username: { selector: '.registration.username', type: 'input' }, 
      firstname: { selector: ".registration.first-name", type: 'input' },
      lastname: { selector: ".registration.last-name", type: 'input' },
      marketingCheckbox: { selector: '.registration.marketing-emails', type: 'checkbox' },
      submit: { selector: '.registration.submit-button', type: 'button' },
    }, driver)
  }

  async enterAccountDetails (command: CreateUserCommand) {
    await this.elements.get('email').then((e) => e.type(command.email));
    await this.elements.get('username').then((e) => e.type(command.username))
    await this.elements.get('firstname').then((e) => e.type(command.firstName))
    await this.elements.get('lastname').then((e) => e.type(command.lastName))
  }

  async acceptMarketingEmails () {
    await this.elements.get('marketingCheckbox').then((e) => e.click());
  }

  async submitRegistrationForm () {
    await this.elements.get('submit').then((e) => e.click());
  }

}
