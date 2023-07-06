
import { PuppeteerPageDriver } from "../../puppeteerPageDriver";
import { PageComponents } from "../../pageComponents";

export type RegistrationInput = {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
}

export class RegistrationPage {
  private baseUrl: string;
  private components: PageComponents;

  constructor (private driver: PuppeteerPageDriver) {
    this.driver = driver;
    this.baseUrl = 'http://localhost:3001/register'
    this.components = new PageComponents({
      email: { selector: '.email.registration', type: 'input' },
      firstName: { selector: '.first-name.registration', type: 'input'},
      lastName: { selector: '.last-name.registration', type: 'input'},
      username: { selector: '.username.registration', type: 'input'},
      submissionButton: { selector: '.submit.registration', type: 'button' }
    }, driver)
  }

  loadComponents () {
    this.components.load();
  }

  async registerWithAccountDetails (input: RegistrationInput) {
    await this.components.load();
    await this.components.get('email').type(input.email)
    await this.components.get('firstName').type(input.firstName);
    await this.components.get('lastName').type(input.lastName);
    await this.components.get('username').type(input.userName);
    await this.components.get('submissionButton').click();
  }

  expectToHaveSeenSuccessToast () {
    
  }

  isToastVisible (): boolean {
    return false;
  }

  isToastSuccessful (): boolean {
    return false;
  }

  async open () {
    await this.driver.page.goto(this.baseUrl);
  }

  public isOnPage(): boolean {
    return this.driver.page.url() === this.baseUrl;
  }

}