import { FirebaseService } from '../externalServices/firebaseService';
import { UsersRepository } from '../repos/usersRepo';
import { NavigationService } from '../../../shared/navigation/navigationService';
import { RegistrationPresenter } from './registrationPresenter';
import { UserDm } from '../domain/userDm';
import { UserCredential } from 'firebase/auth';

// Mock the entire firebase service
jest.mock('../externalServices/firebaseService');

describe('RegistrationPresenter Integration', () => {
  let usersRepository: UsersRepository;
  let navigationService: NavigationService;
  let firebaseService: jest.Mocked<FirebaseService>;
  let registrationPresenter: RegistrationPresenter;
  let mockNavigate: jest.Mock;

  const mockUserCredential: UserCredential = {
    user: {
      email: 'test@example.com',
      emailVerified: true,
    } as any,
    providerId: 'google.com',
    operationType: 'signIn'
  } as UserCredential;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Setup mocks
    mockNavigate = jest.fn();
    usersRepository = {
      currentUser: null,
      save: jest.fn(),
      getCurrentUser: jest.fn().resolves(null),
      register: jest.fn(),
      api: {} as any
    };
    navigationService = {
      goTo: jest.fn()
    } as any;
    firebaseService = {
      signInWithGoogle: jest.fn(),
      isAuthenticated: jest.fn().resolves(false)
    } as any;

    registrationPresenter = new RegistrationPresenter(
      usersRepository,
      navigationService,
      firebaseService
    );
  });

  it('should successfully register with Google and navigate to onboarding', async () => {
    // Setup
    firebaseService.signInWithGoogle.mockResolvedValue(mockUserCredential);
    
    // Act
    await registrationPresenter.registerWithGoogle(mockNavigate);

    // Assert
    expect(firebaseService.signInWithGoogle).toHaveBeenCalled();
    expect(usersRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        props: expect.objectContaining({
          isAuthenticated: true,
          firebaseCredentials: mockUserCredential
        })
      })
    );
    expect(navigationService.goTo).toHaveBeenCalledWith('/onboarding', mockNavigate);
  });

  it('should handle failed or cancelled Google registration', async () => {
    // Setup
    const error = new Error('Google sign in failed');
    firebaseService.signInWithGoogle.mockRejectedValue(error);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Act
    await registrationPresenter.registerWithGoogle(mockNavigate);

    // Assert
    expect(firebaseService.signInWithGoogle).toHaveBeenCalled();
    expect(usersRepository.save).not.toHaveBeenCalled();
    expect(navigationService.goTo).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Auth error:', error);

    consoleSpy.mockRestore();
  });

  it('should skip registration if user is already authenticated', async () => {
    // Setup
    const existingUser = new UserDm({
      isAuthenticated: true,
      username: 'existing@example.com',
      userRoles: []
    });
    usersRepository.getCurrentUser = jest.fn().resolves(existingUser);

    // Act
    await registrationPresenter.registerWithGoogle(mockNavigate);

    // Assert
    expect(firebaseService.signInWithGoogle).not.toHaveBeenCalled();
    expect(usersRepository.save).not.toHaveBeenCalled();
    expect(navigationService.goTo).toHaveBeenCalledWith('/onboarding', mockNavigate);
  });
}); 