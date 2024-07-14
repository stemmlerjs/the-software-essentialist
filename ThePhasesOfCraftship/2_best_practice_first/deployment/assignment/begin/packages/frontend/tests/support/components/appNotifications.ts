import { PuppeteerPageDriver } from "../driver/puppeteerPageDriver";
import { Component } from "./component";
import { appSelectors } from "@dddforum/frontend/src/shared/selectors";

export class AppNotifications extends Component {
  constructor(driver: PuppeteerPageDriver) {
    super(driver);
  }

  async getErrorNotificationText() {
    let usernameElement = await this.driver.page
      .waitForSelector(appSelectors.notifications.failure, { timeout: 2000 })
      .then((el) => {
        return el?.evaluate((e) => e.textContent);
      });
    return usernameElement;
  }
}
