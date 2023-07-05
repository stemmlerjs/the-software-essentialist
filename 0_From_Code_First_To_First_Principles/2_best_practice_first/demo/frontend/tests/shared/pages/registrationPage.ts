import { ElementHandle } from "puppeteer";
import { PuppeteerPageDriver } from "../puppeteerPageDriver";

export type RegistrationInput = {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
}

interface PageComponentsConfig {
  [key: string]: { selector: string, type: 'input' | 'button' }
}

interface LoadedPageComponents {
  [key: string]: { selector: string, type: 'input' | 'button', element: ElementHandle<Element> }
  
}

class PageComponents {
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

export class RegistrationPage {
  private baseUrl: string;
  private components: PageComponents;

  constructor (private driver: PuppeteerPageDriver) {
    this.driver = driver;
    this.baseUrl = 'http://localhost:3000/register'
    this.components = new PageComponents({
      email: { selector: '.email .registration', type: 'input' },
      firstName: { selector: '.first-name .registration', type: 'input'},
      lastName: { selector: '.last-name .registration', type: 'input'},
      username: { selector: '.username .registration', type: 'input'},
      submissionButton: { selector: '.submit .registration', type: 'button' }
    }, driver)
  }

  loadComponents () {
    this.components.load();
  }

  registerWithAccountDetails (input: RegistrationInput) {
    this.components.load();
    this.components.get('email').type(input.email)
    this.components.get('firstName').type(input.firstName);
    this.components.get('lastName').type(input.lastName);
    this.components.get('username').type(input.userName);
    this.components.get('submissionButton').click();
  }

  expectToHaveSeenSuccessToast () {
    
  }

  isToastVisible (): boolean {
    return false;
  }

  isToastSuccessful (): boolean {
    return false;
  }

  async open () {
    await this.driver.page.goto(this.baseUrl);
  }

  public isOnPage(): boolean {
    return this.driver.page.url() === this.baseUrl;
  }

  

}