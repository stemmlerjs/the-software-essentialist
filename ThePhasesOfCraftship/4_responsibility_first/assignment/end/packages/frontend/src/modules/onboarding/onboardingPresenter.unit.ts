import { OnboardingPresenter } from "./onboardingPresenter";
import { UsersRepository } from "../users/repos/usersRepo";
import { NavigationService } from "../../shared/navigation/navigationService";
import { FirebaseService } from "../users/externalServices/firebaseService";
import { AuthStore } from "../../stores/auth/authStore";

describe('OnboardingPresenter', () => {
  let presenter: OnboardingPresenter;
  let usersRepository: jest.Mocked<UsersRepository>;
  let navigationService: jest.Mocked<NavigationService>;
  let firebaseService: jest.Mocked<FirebaseService>;
  let authStore: jest.Mocked<AuthStore>;

  const mockDetails = {
    username: 'testuser',
    email: 'test@example.com',
    userId: 'user123',
    allowMarketing: true
  };

  beforeEach(() => {
    usersRepository = {
      register: jest.fn(),
      getCurrentUser: jest.fn(),
    } as any;

    navigationService = {
      goTo: jest.fn(),
    } as any;

    firebaseService = {
      getCurrentUser: jest.fn().mockReturnValue({
        getIdToken: jest.fn().mockResolvedValue('mock-token')
      }),
    } as any;

    authStore = {
      setCurrentUser: jest.fn()
    } as any;

    presenter = new OnboardingPresenter(
      usersRepository,
      navigationService,
      firebaseService,
      authStore
    );
  });

  it('should successfully register a member', async () => {
    const mockUser = { /* mock user object */ };
    usersRepository.register.mockResolvedValue({ success: true });
    usersRepository.getCurrentUser.mockResolvedValue(mockUser);

    const result = await presenter.registerMember(mockDetails);

    expect(result).toBe(true);
    expect(usersRepository.register).toHaveBeenCalledWith({
      username: mockDetails.username,
      email: mockDetails.email,
      userId: mockDetails.userId,
      idToken: 'mock-token'
    });
    expect(navigationService.goTo).toHaveBeenCalledWith('/');
    expect(presenter.isSubmitting).toBe(false);
    expect(presenter.error).toBeNull();
    expect(usersRepository.getCurrentUser).toHaveBeenCalled();
    expect(authStore.setCurrentUser).toHaveBeenCalledWith(mockUser);
  });

  it('should handle registration failure', async () => {
    const errorMessage = 'Registration failed';
    usersRepository.register.mockResolvedValue({ 
      success: false, 
      error: errorMessage 
    });

    const result = await presenter.registerMember(mockDetails);

    expect(result).toBe(false);
    expect(presenter.error).toBe(errorMessage);
    expect(navigationService.goTo).not.toHaveBeenCalled();
  });

  it('should handle missing authentication token', async () => {
    firebaseService.getCurrentUser.mockReturnValue(null);

    const result = await presenter.registerMember(mockDetails);

    expect(result).toBe(false);
    expect(presenter.error).toBe('No authentication token found');
    expect(usersRepository.register).not.toHaveBeenCalled();
  });
});
