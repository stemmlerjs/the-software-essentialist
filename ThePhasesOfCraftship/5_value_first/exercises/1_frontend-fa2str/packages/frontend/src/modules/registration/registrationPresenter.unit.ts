import { createAPIClient } from "@dddforum/shared/src/api";
import { MarketingService } from "../../../shared/services/marketingService";
import { FirebaseService } from "../externalServices/firebaseService";
import { ProductionUsersRepository } from "../repos/productionUsersRepo";
import { RegistrationPresenter } from "./registrationPresenter";
import { LocalStorage } from "../../../shared/storage/localStorage";
import { NavigationService } from "../../../shared/navigation/navigationService";
import { AuthRepository } from "../users/repos/authRepository";

describe('registrationPresenter', () => {

  let apiClient = createAPIClient('http://localhost:3000');
  let localStorage = new LocalStorage();
  let firebaseService = new FirebaseService();
  let usersRepository = new ProductionUsersRepository(apiClient, localStorage, firebaseService);
  let marketingService = new MarketingService();
  let navigationService = new NavigationService();
  let authRepository: AuthRepository;

  let registrationPresenter = new RegistrationPresenter(usersRepository, navigationService, firebaseService);
  
  beforeEach(() => {
    jest.clearAllMocks();
    authRepository = {
      isAuthenticated: jest.fn(),
      save: jest.fn()
    } as unknown as AuthRepository;

    navigationService = {
      navigate: jest.fn()
    } as NavigationService;

    firebaseService = {
      signInWithGoogle: jest.fn(),
      signInWithGithub: jest.fn()
    } as unknown as FirebaseService;

    registrationPresenter = new RegistrationPresenter(
      authRepository,
      navigationService,
      firebaseService
    );
  })

  it('should call an error toast when an invalid form is submitted', async () => {
    registrationPresenter.toastService.showError = jest.fn();
    let response = await registrationPresenter.submitForm({ 
      email: 'invalid', 
      username: 'a', 
      firstName: "khalil", 
      lastName: "stemmmler" 
    }, false);
    expect (registrationPresenter.toastService.showError).toHaveBeenCalled();
    expect (response).toBe('ValidationError');
  });

  it ('should not call an error toast when a valid form is submitted', () => {
    registrationPresenter.toastService.showError = jest.fn();
    registrationPresenter.submitForm({ 
      email: 'khalil@essentialist.dev', 
      username: 'khalilstemmler', 
      firstName: "khalil", 
      lastName: "stemmmler" 
    }, false);
    expect (registrationPresenter.toastService.showError).toHaveBeenCalledTimes(0);
  });

  it('should redirect to the main page after a successful registration', async () => {
    registrationPresenter.usersRepository.register = jest.fn().mockResolvedValue({ success: true });
    registrationPresenter.toastService.showError = jest.fn();
    registrationPresenter.navigationRepository.goTo = jest.fn();
    await registrationPresenter.submitForm({ 
      email: 'khalil@essentialist.dev', 
      username: 'khalilstemmler', 
      firstName: "khalil", 
      lastName: "stemmmler" 
    }, false);

    expect (registrationPresenter.navigationRepository.goTo).toHaveBeenCalledWith('/', { inSeconds: 3000});
  });

  it('should call the marketing API if the user opts in', async () => {
    registrationPresenter.usersRepository.register = jest.fn().mockResolvedValue({ success: true });
    registrationPresenter.marketingService.addEmailToList = jest.fn();
    
    await registrationPresenter.submitForm({ 
      email: 'khalil@essentialist.dev', 
      username: 'khalilstemmler', 
      firstName: "khalil", 
      lastName: "stemmmler" 
    }, true);

    expect(marketingService.addEmailToList).toHaveBeenCalled();
  });

  describe('signInWithGoogle', () => {
    it('should handle successful sign in', async () => {
      const mockUser = { email: 'test@test.com' };
      (firebaseService.signInWithGoogle as jest.Mock).mockResolvedValue(mockUser);

      await registrationPresenter.signInWithGoogle();

      expect(firebaseService.signInWithGoogle).toHaveBeenCalled();
      expect(navigationService.navigate).toHaveBeenCalledWith('/onboarding');
      expect(registrationPresenter.error).toBeNull();
    });

    it('should handle sign in error', async () => {
      const error = new Error('Failed to sign in');
      (firebaseService.signInWithGoogle as jest.Mock).mockRejectedValue(error);

      await registrationPresenter.signInWithGoogle();

      expect(registrationPresenter.error).toBe('Failed to sign in');
    });
  });
})
