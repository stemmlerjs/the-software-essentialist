import puppeteer, { Browser, Page, PuppeteerLaunchOptions } from "puppeteer";

export class BrowserDriver {
  constructor(private instance: Browser, private page: Page) {}

  public static async create(options?: PuppeteerLaunchOptions) {
    let instance = await puppeteer.launch(options);
    let page = await instance.newPage();
    return new BrowserDriver(instance, page);
  }

  public waitForSelector(selector: string) {
    return this.page.waitForSelector(selector);
  }

  public goTo(url: string) {
    this.page.goto(url);
  }
}
