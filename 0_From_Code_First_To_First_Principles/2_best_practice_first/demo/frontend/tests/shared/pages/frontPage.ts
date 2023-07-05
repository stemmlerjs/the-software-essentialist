
import { PageObject } from "../pageObject";
import { PuppeteerPageDriver } from "../puppeteerPageDriver";

export class FrontPage {

  private baseUrl: string;

  constructor (private driver: PuppeteerPageDriver) {
    this.driver = driver;
    this.baseUrl = 'http://localhost:3000/'
  }

  async open () {
    await this.driver.page.goto(this.baseUrl);
  }

  public isOnPage(): boolean {
    return this.driver.page.url() === this.baseUrl;
  }
}