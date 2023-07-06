

import { PuppeteerPageDriver } from "../../puppeteerPageDriver";

export class FrontPage {

  private baseUrl: string;

  constructor (private driver: PuppeteerPageDriver) {
    this.driver = driver;
    this.baseUrl = 'http://localhost:3001/'
  }

  async open () {
    await this.driver.page.goto(this.baseUrl);
  }

  public async isOnPage(): Promise<boolean> {
    let result = await this.driver.browser.waitForTarget(
      target => target.url() === this.baseUrl
    );

    if (result) return true;
    return false;
  }
}