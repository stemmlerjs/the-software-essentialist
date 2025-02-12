
import { NavigationDm } from "../domain/navigationDm"
import { makeAutoObservable } from "mobx";
import { NavigationRepository } from "./navigationRepository";

export class FakeNavigationRepository implements NavigationRepository {
  public navigationDm: NavigationDm;

  constructor () {
    makeAutoObservable(this);
    this.navigationDm = new NavigationDm();
  }
  
  getCurrentNavigation () {
    return this.navigationDm;
  }
}
