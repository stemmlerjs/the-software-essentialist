
import { FrontPage } from "./pages/frontPage/frontPage";
import { RegistrationPage } from "./pages/registrationPage/registrationPage";
import { PuppeteerPageDriver } from "./puppeteerPageDriver";

type PageType = "FrontPage" | "RegistrationPage";

export abstract class PageObject {
  constructor(
    protected driver: PuppeteerPageDriver,
    protected baseUrl: string
  ) {}

  public open() {
    this.driver.page.goto(this.baseUrl);
  }

  public static async create<T>(type: PageType, driver: PuppeteerPageDriver) {
    switch (type) {
      case "FrontPage":
        return new FrontPage(driver) as T;
      case "RegistrationPage":
        return new RegistrationPage(driver) as T;
      default:
        throw new Error("Invalid page type");
    }
  }

  public waitForSelector(selector: string) {
    return this.driver.page.waitForSelector(selector);
  }

  
}
