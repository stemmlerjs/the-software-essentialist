import { LayoutPresenter } from "./layoutPresenter";
import { AuthStore } from "@/modules/auth/authStore";
import { FakeFirebaseAPI } from "@/modules/auth/fakeFirebaseAPI";
import { createAPIClient } from "@dddforum/api";
import { NavigationStore } from "@/shared/navigation/navigationStore";
import { 
  setupAuthStoreWithAuthenticatedUser,
  setupAuthStoreWithOnboardedMember 
} from "../testUtils";
import { UserLoginLayoutViewModel } from "./userLoginLayoutVm";

describe('LayoutPresenter', () => {
  let presenter: LayoutPresenter;
  let authStore: AuthStore;
  let navigationStore: NavigationStore;
  let loadedVm: UserLoginLayoutViewModel;

  beforeEach(() => {
    const apiClient = createAPIClient('');
    const fakeFirebaseAPI = new FakeFirebaseAPI();
    
    authStore = new AuthStore(apiClient, fakeFirebaseAPI);
    navigationStore = new NavigationStore();
    presenter = new LayoutPresenter(authStore, navigationStore);
  });

  describe('layout view model', () => {
    it('should show username when user is authenticated and has completed onboarding', async () => {
      // Setup
      const { user } = setupAuthStoreWithAuthenticatedUser(authStore);
      setupAuthStoreWithOnboardedMember(authStore, user, {
        username: 'khalilstemmler'
      });

      // Execute
      await presenter.load((vm) => {
        loadedVm = vm;
      });

      // Assert
      expect(loadedVm.username).toBe('khalilstemmler');
      expect(loadedVm.isAuthenticated).toBe(true);
      expect(loadedVm.hasCompletedOnboarding).toBe(true);
    });

    it('should show no username when user is not authenticated', async () => {
      // Execute
      await presenter.load((vm) => {
        loadedVm = vm;
      });

      // Assert
      expect(loadedVm.username).toBeNull();
      expect(loadedVm.isAuthenticated).toBe(false);
      expect(loadedVm.hasCompletedOnboarding).toBe(false);
    });

    it('should show authenticated but not onboarded state when appropriate', async () => {
      // Setup - user authenticated but no member details
      setupAuthStoreWithAuthenticatedUser(authStore);
      // Note: Explicitly not calling setupAuthStoreWithOnboardedMember

      // Execute
      await presenter.load((vm) => {
        loadedVm = vm;
      });

      // Assert
      expect(loadedVm.username).toBeNull();
      expect(loadedVm.isAuthenticated).toBe(true);
      expect(loadedVm.hasCompletedOnboarding).toBe(false);
    });
  });

  describe('actions', () => {
    it('should sign out the user and navigate to home', async () => {
      // Setup
      const { user } = setupAuthStoreWithAuthenticatedUser(authStore);
      setupAuthStoreWithOnboardedMember(authStore, user, {
        username: 'testuser'
      });
      const logoutSpy = jest.spyOn(authStore, 'logout');
      const navigateSpy = jest.spyOn(navigationStore, 'navigate');

      // Execute
      await presenter.signOut();

      // Assert
      expect(logoutSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith('/');
    });
  });
});
