
import { PuppeteerPageDriver } from "../driver";

type ElementType = "input" | "button" | "div" | "checkbox";

export type PageElementsSelector = { selector: string; type: ElementType } | Component;

export interface PageElementsConfig {
  [key: string]: PageElementsSelector;
}

export abstract class Component {
  constructor (protected driver: PuppeteerPageDriver) {
   
  }
}

export class PageElements {
  constructor(
    private config: PageElementsConfig,
    private driver: PuppeteerPageDriver
  ) {}

  async get(nameKey: string, timeout?: number) {
    const component = this.config[nameKey];
    let element;

    if (component instanceof Component) {
      return component
    }

    try {
      element = await this.driver.page.waitForSelector(component.selector, { timeout });
    } catch (err) {
      console.log("Element not found");
      throw new Error(`Element ${nameKey} not found!`);
    }

    if (!element) {
      throw new Error(
        `Could not load component's element ${nameKey}: maybe it's not on the page yet.`
      );
    }

    return element;
  }
}
