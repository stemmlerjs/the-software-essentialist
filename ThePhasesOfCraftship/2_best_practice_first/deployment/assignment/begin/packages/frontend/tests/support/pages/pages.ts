import { PuppeteerPageDriver } from "../driver/puppeteerPageDriver";
import { RegistrationPage } from "./registrationPage";

export interface Pages {
  registration: RegistrationPage;
}

export function createPageObjects(pageDriver: PuppeteerPageDriver): Pages {  
  return {
    registration: new RegistrationPage(pageDriver)
  }
}