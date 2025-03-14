import { OnboardingPresenter } from "./onboardingPresenter";
import { NavigationService } from "../../shared/navigation/navigationService";
import { FirebaseService } from "../users/externalServices/firebaseService";
import { MembersStore } from "../../shared/stores/members/membersStore";
import { FakeLocalStorage } from '../../shared/storage/fakeLocalStorage';

describe('OnboardingPresenter', () => {
  describe('member registration', () => {
    let presenter: OnboardingPresenter;
    let membersStore: MembersStore;
    let navigationService: jest.Mocked<NavigationService>;
    let firebaseService: jest.Mocked<FirebaseService>;
    let fakeLocalStorage: FakeLocalStorage;

    beforeEach(() => {

      // If local storage is needed by your store or repository:
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

      // If your membersStore or userRepo needs localStorage, pass in fakeLocalStorage instead
      presenter = new OnboardingPresenter(
        membersStore,
        navigationService,
        firebaseService
      );
    });
  
    afterEach(() => {
      // Restore the original mock so other tests won't be affected
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
