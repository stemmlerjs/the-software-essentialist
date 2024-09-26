
import { AppNotifications, HeaderComponent  } from "../components";
import { PuppeteerPageDriver } from "../driver";
import { RegistrationPage } from "./registrationPage";

export interface App {
  pages: Pages;
  layout: {
    header: HeaderComponent;
    notifications: AppNotifications;
  }
}

interface Pages {
  registration: RegistrationPage;
}

export function createAppObject(pageDriver: PuppeteerPageDriver): App {  
  return {
    pages: {
      registration: new RegistrationPage(pageDriver)
    },
    layout: {
      header: new HeaderComponent(pageDriver),
      notifications: new AppNotifications(pageDriver)
    }
  }
}
