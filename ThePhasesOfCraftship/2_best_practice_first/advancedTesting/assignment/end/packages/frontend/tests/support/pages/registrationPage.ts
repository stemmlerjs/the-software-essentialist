import { PuppeteerPageDriver } from "../driver";
import { PageObject } from "./pageObject";
import { PageElements, PageElementsConfig } from "../components";
import { CreateUserParams } from "@dddforum/shared/src/api/users";
import { appSelectors } from "@dddforum/frontend/src/shared/selectors";


export class RegistrationPage extends PageObject {
  private elements: PageElements;

  constructor(driver: PuppeteerPageDriver) {
    super(driver, "http://localhost:5173/join");
    this.elements = new PageElements(
      appSelectors.registration.registrationForm as PageElementsConfig,
      driver,
    );
  }

  async enterAccountDetails(params: CreateUserParams) {
    await this.elements.get("email").then((e: any) => e.type(params.email));
    await this.elements.get("username").then((e: any) => e.type(params.username));
    await this.elements.get("firstname").then((e: any) => e.type(params.firstName));
    await this.elements.get("lastname").then((e: any) => e.type(params.lastName));
  }

  async acceptMarketingEmails() {
    await this.elements.get("marketingCheckbox").then((e: any) => e.click());

  }

  async submitRegistrationForm() {
    await this.elements.get("submit").then((e: any) => e.click());
  }

}
