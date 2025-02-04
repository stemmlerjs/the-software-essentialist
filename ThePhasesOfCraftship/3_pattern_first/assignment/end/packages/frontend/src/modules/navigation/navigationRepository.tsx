
import { NavigationDm } from "./navigationDm"
import { makeAutoObservable } from "mobx";

export class NavigationRepository {
  private navigation: NavigationDm;

  constructor () {
    makeAutoObservable(this);
    this.navigation = new NavigationDm();
  }
  
  getCurrentNavigation () {
    return this.navigation;
  }
}
