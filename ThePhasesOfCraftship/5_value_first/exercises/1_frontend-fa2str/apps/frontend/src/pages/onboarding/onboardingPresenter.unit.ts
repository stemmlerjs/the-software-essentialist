import { OnboardingPresenter } from "./onboardingPresenter";
import { NavigationService } from "../../shared/navigation/navigationService";
import { MembersStore } from "../../shared/stores/members/membersStore";
import { FakeLocalStorage } from '../../shared/storage/fakeLocalStorage';
import { FirebaseService } from "@/modules/users/externalServices/firebaseService";

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
    let membersStore: MembersStore;
    let navigationService: jest.Mocked<NavigationService>;
    let firebaseService: jest.Mocked<FirebaseService>;
    let fakeLocalStorage: FakeLocalStorage;

    beforeEach(() => {
      fakeLocalStorage = new FakeLocalStorage();

      membersStore = new MembersStore();
      navigationService = { navigate: jest.fn() } as any;
      firebaseService = {
        getCurrentUser: jest.fn().mockResolvedValue({
          email: 'test@example.com',
          uid: 'test-uid',
          getIdToken: jest.fn().mockResolvedValue('mock-token')
        })
      } as any;

      presenter = new OnboardingPresenter(
        membersStore,
        navigationService,
        firebaseService
      );
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    test('should read from localStorage', () => {
      expect(window.localStorage.getItem('someKey')).toBe('myCustomValue');
    });


    test('should successfully register a member', async () => {
      jest.spyOn(membersStore, 'createMember').mockResolvedValue({ success: true });

      const result = await presenter.registerMember({
        username: 'testuser',
        allowMarketing: false
      });

      expect(result).toBe(true);
      expect(membersStore.createMember).toHaveBeenCalledWith({
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
      jest.spyOn(membersStore, 'createMember').mockResolvedValue({ 
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
