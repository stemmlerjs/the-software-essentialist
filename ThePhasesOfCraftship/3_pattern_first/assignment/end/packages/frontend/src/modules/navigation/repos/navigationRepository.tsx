import { NavigationDm } from "../domain/navigationDm";

export interface NavigationRepository {
  navigationDm: NavigationDm;
  getCurrentNavigation(): NavigationDm;
  goTo (path: string, options?: { inSeconds: number }): void;
}
