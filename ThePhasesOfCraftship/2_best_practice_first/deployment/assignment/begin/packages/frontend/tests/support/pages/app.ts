
import { AppNotifications, HeaderComponent  } from "../components";
import { PuppeteerPageDriver } from "../driver";
import { RegistrationPage } from "./registrationPage";

export interface App {
  pages: Pages;
  header: HeaderComponent;
  notifications: AppNotifications;
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
    notifications: new AppNotifications(pageDriver)
  }
}
