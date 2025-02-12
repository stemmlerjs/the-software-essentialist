import { NavigationDm } from "../domain/navigationDm";
import { NavigationRepository } from "./navigationRepository";

export class ProductionNavigationRepository implements NavigationRepository {
  public navigationDm: NavigationDm;

  constructor (navigationDm: NavigationDm) {
    this.navigationDm = navigationDm;
    this.subscribeToBrowserNavigationChanges();
  }

  getCurrentNavigation () {
    // Should access the real browser navigation state from the window
    throw new Error("Method not implemented.");
    return this.navigationDm;
  }

  subscribeToBrowserNavigationChanges () {
    // Should subscribe to the REAL browser navigation changes and update the navigationDm
    // when it changes
    throw new Error("Method not implemented.");
  }

}
