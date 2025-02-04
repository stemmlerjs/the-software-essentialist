
import { NavigationDm } from "./navigationDm"

export class NavigationRepository {
  private navigation: NavigationDm;

  constructor () {
    this.navigation = new NavigationDm();
  }
  getCurrentNavigation () {
    return this.navigation;
  }
}
