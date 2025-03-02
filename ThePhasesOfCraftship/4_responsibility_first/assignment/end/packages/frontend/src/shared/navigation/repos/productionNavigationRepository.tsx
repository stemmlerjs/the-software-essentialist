import { makeAutoObservable } from "mobx";
import { NavigationDm } from "../domain/navigationDm";
import { NavigationRepository } from "./navigationRepository";
import { NavigateFunction } from "react-router-dom";

export class ProductionNavigationRepository implements NavigationRepository {
  public navigationDm: NavigationDm;

  constructor () {
    makeAutoObservable(this);
    this.navigationDm = new NavigationDm({ pathname: window.location.pathname })
    this.subscribeToBrowserNavigationChanges();
  }

  getCurrentNavigation () {
    // Should access the real browser navigation state from the window
    return this.navigationDm;
  }

  subscribeToBrowserNavigationChanges () {
    window.addEventListener('popstate', this.handleNavigationChange.bind(this));
  }

  private handleNavigationChange() {
    // Update the navigationDm based on the current browser state
    console.log('handle path change')
    this.navigationDm = new NavigationDm({ pathname: window.location.pathname });
  }

  goTo (path: string, navigate?: NavigateFunction): void {
    this.navigationDm = new NavigationDm({ pathname: path });
    if (navigate) return navigate(path);
    window.history.pushState({}, '', path); 
  }

}
