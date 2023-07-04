import { BrowserDriver } from "../browserDriver";

export class RegistrationPage {
  private driver: BrowserDriver;

  constructor (driver: BrowserDriver) {
    this.driver = driver;
  }

  public open () {
    this.driver.goTo('http://localhost:3000/register')
  }

  registerWithAccountDetails () {

  }

  expectToHaveSeenSuccessToast () {
    
  }

  

}