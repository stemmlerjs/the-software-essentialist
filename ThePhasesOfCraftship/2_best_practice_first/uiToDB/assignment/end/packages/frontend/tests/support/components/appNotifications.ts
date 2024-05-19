
import { ElementHandle } from "puppeteer";
import { PuppeteerPageDriver } from "../driver/puppeteerPageDriver";
import { Component, PageElements } from "./component";

export class AppNotifications extends Component {

  constructor(driver: PuppeteerPageDriver) {
    super(driver);
  }

  async getErrorNotificationText () {
    let usernameElement = await this.driver.page.waitForSelector('#failure-toast', { timeout: 2000 }).then((el) => {
      return el?.evaluate((e) => e.textContent)
    })
    return usernameElement;
    // return (usernameElement as ElementHandle)?.evaluate((e) => e.textContent);
  }
  
}
