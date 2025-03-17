import { OnboardingPresenter } from "./onboardingPresenter";
import { FakeLocalStorage } from '../../shared/storage/fakeLocalStorage';
import { AuthStore } from "@/services/auth/auth/authStore";
import { FakeFirebaseAPI } from "@/modules/members/fakeFirebaseAPI";
import { createAPIClient } from "@dddforum/api";
import { NavigationService } from "@/modules/navigation/navigationService";
import { UserDm } from "@/modules/members/domain/userDm";

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

function setupAuthStoreWithAuthenticatedUser(authStore: AuthStore) {
  authStore['currentUser'] = new UserDm({
    id: 'test-user-id',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    userRoles: []
  })
  authStore
  return { authStore }
}

describe('OnboardingPresenter', () => {
  describe('member registration', () => {
    let presenter: OnboardingPresenter;
    let navigationService: jest.Mocked<NavigationService>;
    let fakeFirebaseAPI: FakeFirebaseAPI;
    let fakeLocalStorage: FakeLocalStorage;
    let authStore: AuthStore;

    beforeEach(() => {
      let apiClient = createAPIClient('');
      fakeLocalStorage = new FakeLocalStorage();
      fakeFirebaseAPI = new FakeFirebaseAPI();

      authStore = new AuthStore(
        apiClient,
        fakeFirebaseAPI,
        fakeLocalStorage
      );

      navigationService = {
        navigate: jest.fn()
      } as jest.Mocked<NavigationService>;

      presenter = new OnboardingPresenter(
        navigationService,
        authStore
      );
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('Given the user exits, then it should successfully be able to register a member', async () => {
      // Arrange
      setupAuthStoreWithAuthenticatedUser(authStore);
      jest.spyOn(authStore, 'createMember').mockResolvedValue({ success: true });

      const result = await presenter.registerMember({
        username: 'testuser',
        allowMarketing: false
      });

      expect(result).toBe(true);
      expect(authStore.createMember).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        userId: 'test-uid',
        idToken: 'mock-token',
        allowMarketing: false
      });
      expect(navigationService.navigate).toHaveBeenCalledWith('/');
      expect(presenter.isSubmitting).toBe(false);
      expect(presenter.error).toBeNull();
    });

    it('Should fail to complete onboarding if the user has not yet been created', async () => {
      const errorMessage = 'No authenticated user found';
      jest.spyOn(authStore, 'createMember').mockResolvedValue({ 
        success: false, 
        error: { message: errorMessage }
      });

      const result = await presenter.registerMember({
        username: 'testuser',
        allowMarketing: false
      });

      expect(result).toBe(false);
      expect(presenter.error).toBe(errorMessage);
      expect(navigationService.navigate).not.toHaveBeenCalled();
    });
  });
});
