import { CreateUserCommand } from "@dddforum/shared/src/api/users";
import { PageElements, PageElementsConfig } from "../components/component";
import { PuppeteerPageDriver } from "../driver/puppeteerPageDriver";
import { PageObject } from "./pageObject";
import { appSelectors } from "@dddforum/frontend/src/shared/selectors";

export class RegistrationPage extends PageObject {
  private elements: PageElements;

  constructor(driver: PuppeteerPageDriver) {
    super(driver, "http://localhost:4000/join");
    this.elements = new PageElements(
      appSelectors.registration.registrationForm as PageElementsConfig,
      driver,
    );
  }

  async enterAccountDetails(command: CreateUserCommand) {
    await this.elements.get("email").then((e) => e.type(command.email));
    await this.elements.get("username").then((e) => e.type(command.username));
    await this.elements.get("firstname").then((e) => e.type(command.firstName));
    await this.elements.get("lastname").then((e) => e.type(command.lastName));
  }

  async acceptMarketingEmails() {
    await this.elements.get("marketingCheckbox").then((e) => e.click());
  }

  async submitRegistrationForm() {
    await this.elements.get("submit").then((e) => e.click());
  }
}
