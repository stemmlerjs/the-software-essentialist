import { NavigationDm } from "../domain/navigationDm";

export interface NavigationRepository {
  navigationDm: NavigationDm;
  getCurrentNavigation(): NavigationDm;
}
