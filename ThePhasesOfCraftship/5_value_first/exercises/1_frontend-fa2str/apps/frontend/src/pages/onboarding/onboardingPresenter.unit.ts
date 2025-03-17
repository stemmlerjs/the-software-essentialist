import { OnboardingPresenter } from "./onboardingPresenter";
import { FakeLocalStorage } from '../../shared/storage/fakeLocalStorage';
import { AuthStore } from "@/modules/auth/authStore";
import { FakeFirebaseAPI } from "@/modules/auth/fakeFirebaseAPI";
import { createAPIClient } from "@dddforum/api";
import { MarketingService } from "@/modules/marketing/marketingService";
import { NavigationStore } from '@/shared/navigation/navigationStore'
import { setupAuthStoreWithAuthenticatedUser } from "@/shared/testUtils";

// You have to replicate the way it's imported. We export "appConfig"
jest.mock('@/config', () => ({
  appConfig: {
    apiURL: 'http://localhost:3000',
    firebase: {
      apiKey: 'test-api-key',
      authDomain: 'test-auth-domain', 
      projectId: 'test-project-id'
    }
  }
}));

describe('OnboardingPresenter', () => {

  describe('member registration', () => {
    let presenter: OnboardingPresenter;
    let navigationStore: NavigationStore
    let fakeFirebaseAPI: FakeFirebaseAPI;
    let fakeLocalStorage: FakeLocalStorage;
    let authStore: AuthStore;
    let marketingService: MarketingService;

    beforeEach(() => {
      let apiClient = createAPIClient('');
      fakeLocalStorage = new FakeLocalStorage();
      fakeFirebaseAPI = new FakeFirebaseAPI();
      marketingService = new MarketingService();

      navigationStore = new NavigationStore();

      authStore = new AuthStore(
        apiClient,
        fakeFirebaseAPI,
      );

      presenter = new OnboardingPresenter(
        navigationStore,
        authStore,
        marketingService
      );
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('Given the user exits, then it should successfully be able to register a member', async () => {
      
      /**
       * If the user happens to be on the onboarding page, this is where we can verify that it works correctly.
       * We are testing the registerMember method on the onboarding presenter. As a unit test, this may simply
       * verify using State Verification on the associated presenters, that they end up with the right details.
       */

      let { user } = setupAuthStoreWithAuthenticatedUser(authStore);
      let memberDetails = {
        username: 'testuser'
      }
      jest.spyOn(authStore['apiClient']['members'], 'create').mockResolvedValue({
        success: true,
        data: {
          memberId: 'test-member-id',
          userId: user.id,
          username: memberDetails.username,
          reputationLevel: 'Level1',
          reputationScore: 0
        }
      });

      let navigationSpy = jest.spyOn(navigationStore, 'navigate');

      const result = await presenter.registerMember({
        username: memberDetails.username,
        allowMarketing: false
      });

      expect(result).toBe(true);
      expect(authStore.currentMember).not.toBe(null);
      expect(authStore.currentMember?.username).toBe(memberDetails.username);
      expect(authStore.currentMember?.reputationLevel === 'Level1').toBe(true)
      expect(navigationSpy).toHaveBeenCalledWith('/');
      expect(presenter.isSubmitting).toBe(false);
      expect(presenter.error).toBeNull();
    });

    test('Should fail to complete onboarding if the user has not yet been created', async () => {
      /**
       * If under some circumstance, the user is on the onboarding page and they are not authenticated,
       * then this should fail. This test is useful, however, a more useful test and functionality would be
       * to subscribe to the auth state changes of firebase, and redirect to the "/" page when auth state
       * changes.
       */

      // Setup
      authStore['currentUser'] = null;
      let memberDetails = {
        username: 'testuser'
      };
      let navigationSpy = jest.spyOn(navigationStore, 'navigate');

      // Execute
      const result = await presenter.registerMember({
        username: memberDetails.username,
        allowMarketing: false
      });

      // Assert
      expect(result).toBe(false);
      expect(presenter.error).toBe('No authenticated user found');
      expect(navigationSpy).not.toHaveBeenCalled();
      expect(presenter.isSubmitting).toBe(false);
      expect(authStore.currentMember).toBe(null);
    });
  });
});
