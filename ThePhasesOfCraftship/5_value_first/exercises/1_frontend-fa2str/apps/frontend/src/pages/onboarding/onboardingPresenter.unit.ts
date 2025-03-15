import { OnboardingPresenter } from "./onboardingPresenter";
import { FakeLocalStorage } from '../../shared/storage/fakeLocalStorage';
import { AuthStore } from "@/services/auth/auth/authStore";
import { FakeFirebaseAPI } from "@/modules/members/fakeFirebaseAPI";
import { createAPIClient } from "@dddforum/api";
import { NavigationService } from "@/modules/navigation/navigationService";

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

// Your existing test code...

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
  
    test('should read from localStorage', () => {
      expect(window.localStorage.getItem('someKey')).toBe('myCustomValue');
    });


    test('should successfully register a member', async () => {
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

    test('should handle registration failure', async () => {
      const errorMessage = 'Registration failed';
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
