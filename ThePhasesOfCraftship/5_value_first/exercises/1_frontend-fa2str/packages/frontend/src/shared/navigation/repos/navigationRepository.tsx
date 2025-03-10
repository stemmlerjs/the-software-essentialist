import { NavigationDm } from "../domain/navigationDm";

type NavigateFunction = (to: string) => void;

export interface NavigationRepository {
  navigationDm: NavigationDm;
  getCurrentNavigation(): NavigationDm;
  navigate (path: string, navigate?: NavigateFunction): void;
}
