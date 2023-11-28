
import { PuppeteerPageDriver } from "../driver/puppeteerPageDriver";
import { Component } from "./component";

export class HeaderComponent extends Component {
  constructor(driver: PuppeteerPageDriver) {
    super(driver);
  }

  async getUsernameFromMenuButton () {

  }
}
