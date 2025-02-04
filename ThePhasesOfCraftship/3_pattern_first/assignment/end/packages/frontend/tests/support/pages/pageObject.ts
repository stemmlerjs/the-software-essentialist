
import { PuppeteerPageDriver } from "../driver";

export abstract class PageObject {
  protected driver: PuppeteerPageDriver;
  public url: string;

  constructor (driver: PuppeteerPageDriver, url: string) {
    this.driver = driver;
    this.url = url;
  }

  public async open () {
    await this.driver.page.goto(this.url);
  }
}