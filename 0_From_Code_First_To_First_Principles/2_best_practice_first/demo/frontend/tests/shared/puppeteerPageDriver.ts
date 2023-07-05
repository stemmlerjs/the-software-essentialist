import puppeteer, { Browser, Page, PuppeteerLaunchOptions } from "puppeteer";

export class PuppeteerPageDriver {
  constructor(public browser: Browser, public page: Page) {}

  public static async create(options?: PuppeteerLaunchOptions) {
    let instance = await puppeteer.launch(options);
    let page = await instance.newPage();
    return new PuppeteerPageDriver(instance, page);
  }
}
