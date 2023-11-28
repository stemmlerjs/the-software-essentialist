
import { HeaderComponent } from "../components/headerComponent";
import { ToastComponent } from "../components/toastComponent";
import { PuppeteerPageDriver } from "../driver/puppeteerPageDriver";

import { RegistrationPage } from "./registrationPage";

export interface App {
  pages: Pages;
  header: HeaderComponent;
  toast: ToastComponent;
}

interface Pages {
  registration: RegistrationPage;
}

export function createAppObject(pageDriver: PuppeteerPageDriver): App {  
  return {
    pages: {
      registration: new RegistrationPage(pageDriver)
    },
    header: new HeaderComponent(pageDriver),
    toast: new ToastComponent(pageDriver)
  }
}