
import { PuppeteerPageDriver } from "../driver/puppeteerPageDriver";
import { Component, PageElements } from "./component";

export class HeaderComponent extends Component {
  private elements: PageElements;

  constructor(driver: PuppeteerPageDriver) {
    super(driver);
    this.elements = new PageElements({
      header: { selector: '.header.username', type: 'div' },
    }, driver)
  }

  async getUsernameFromHeader () {
    let usernameElement = await this.elements.get('header');
    return usernameElement?.evaluate((e) => e.textContent);
  }
  
}
