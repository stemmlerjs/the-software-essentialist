
import { NavigationDm } from "../domain/navigationDm"
import { makeAutoObservable } from "mobx";
import { NavigationRepository } from "./navigationRepository";

export class FakeNavigationRepository implements NavigationRepository {
  public navigationDm: NavigationDm;

  constructor (currentRoute: string) {
    makeAutoObservable(this);
    this.navigationDm = new NavigationDm({ pathname: currentRoute });
  }
  
  getCurrentNavigation () {
    return this.navigationDm;
  }

  goTo (path: string, options?: { inSeconds: number }) {
    this.navigationDm = new NavigationDm({ pathname: path });
  }
}
