
import { ElementHandle } from "puppeteer";
import { PuppeteerPageDriver } from "./puppeteerPageDriver";

type ElementType = 'input' | 'button' | 'div'

interface PageComponentsConfig {
  [key: string]: { selector: string, type: ElementType }
}

interface LoadedPageComponents {
  [key: string]: { selector: string, type: ElementType, element: ElementHandle<Element> }
  
}

export class PageComponents {
  private loadedPageComponents: LoadedPageComponents | undefined;

  constructor (private config: PageComponentsConfig, private driver: PuppeteerPageDriver) {
    this.loadedPageComponents = undefined;
  }

  public async load () {
    // Attempts to load each and then assigns to loaded
    let loadedPageComponents: LoadedPageComponents = {};

    for (let key of Object.keys(this.config)) {
      let component = this.config[key];
      let element;

      try {
        element = await this.driver.page.waitForSelector(component.selector);
      } catch (err) {
        console.log('Element not found')
        throw new Error('not found!')
      }

      if (!element) {
        throw new Error(`Could not load component's element ${key}: maybe it's not on the page yet.`)
      }

      loadedPageComponents[key] = {
        ...component,
        element
      }
    }

    this.loadedPageComponents = loadedPageComponents;
  }

  get (name: string) {
    if (!this.loadedPageComponents) throw new Error('Page components not loaded yet, make sure you call `.load()` first')
    return this.loadedPageComponents[name].element
  }
}