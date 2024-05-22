
import { appSelectors } from "@dddforum/frontend/src/shared/selectors";
import { PuppeteerPageDriver } from "../driver/puppeteerPageDriver";
import { Component, PageElements, PageElementsSelector } from "./component";

export class HeaderComponent extends Component {
  private elements: PageElements;

  constructor(driver: PuppeteerPageDriver) {
    super(driver);
    this.elements = new PageElements({
      header: appSelectors.header as PageElementsSelector,
    }, driver)
  }

  async getUsernameFromHeader () {
    let usernameElement = await this.elements.get('header');
    return usernameElement?.evaluate((e) => e.textContent);
  }
  
}
