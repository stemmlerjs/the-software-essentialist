
import { NavigationDm } from "../domain/navigationDm"
import { makeAutoObservable } from "mobx";
import { NavigationRepository } from "./navigationRepository";
import { NavigateFunction } from "react-router-dom";

export class FakeNavigationRepository implements NavigationRepository {
  public navigationDm: NavigationDm;

  constructor (currentRoute: string) {
    makeAutoObservable(this);
    this.navigationDm = new NavigationDm({ pathname: currentRoute });
  }
  
  getCurrentNavigation () {
    return this.navigationDm;
  }

  navigate (path: string, navigate?: NavigateFunction) {
    this.navigationDm = new NavigationDm({ pathname: path });
    if (navigate) navigate(path);
  }
}
