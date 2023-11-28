
import { PuppeteerPageDriver } from "../driver/puppeteerPageDriver";
import { Component } from "./component";

export class ToastComponent extends Component {
  constructor(driver: PuppeteerPageDriver) {
    super(driver);
  }

  async showedSuccessToast () {

  }
}
