
import { appSelectors } from "@dddforum/frontend/src/shared/selectors";
import { Component, PageElements, PageElementsSelector } from "./component";
import { PuppeteerPageDriver } from "../driver";

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
