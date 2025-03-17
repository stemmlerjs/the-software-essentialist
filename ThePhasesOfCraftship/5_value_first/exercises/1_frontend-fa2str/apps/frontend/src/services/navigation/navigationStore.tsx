import { makeAutoObservable } from "mobx";
import { NavigateFunction } from "react-router-dom";

export class NavigationStore {
  private _currentPath: string;
  private _navigate: NavigateFunction | null = null;

  constructor() {
    makeAutoObservable(this);
    this._currentPath = window.location.pathname;
  }

  get currentPath(): string {
    return this._currentPath;
  }

  setNavigateFunction(navigate: NavigateFunction) {
    this._navigate = navigate;
  }

  navigate(to: string) {
    if (this._navigate) {
      this._navigate(to);
      this._currentPath = to;
    } else {
      console.warn('Navigation function not set. Make sure to use NavigationProvider.');
    }
  }
} 