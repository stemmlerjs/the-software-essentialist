
import { HeaderComponent } from "../components/headerComponent";
import { PuppeteerPageDriver } from "../driver/puppeteerPageDriver";

import { RegistrationPage } from "./registrationPage";

export interface App {
  pages: Pages;
  header: HeaderComponent;
}

interface Pages {
  registration: RegistrationPage;
}

export function createAppObject(pageDriver: PuppeteerPageDriver): App {  
  return {
    pages: {
      registration: new RegistrationPage(pageDriver)
    },
    header: new HeaderComponent(pageDriver)
  }
}