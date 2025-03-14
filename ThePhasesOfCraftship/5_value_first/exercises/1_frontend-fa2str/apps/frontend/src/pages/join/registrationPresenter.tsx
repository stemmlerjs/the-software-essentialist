
import { NavigationService } from '@/modules/navigation/navigationService';
import { makeAutoObservable, observe } from "mobx";
import { AuthStore } from '@/services/auth/auth/authStore';

export class RegistrationPresenter {

  // TODO: use a view model
  public user: UserDm | null;

  constructor (
    public navigationService: NavigationService,
    public authStore: AuthStore
  ) {
    makeAutoObservable(this);
    this.setupSubscriptions();
    this.user = null;
  }

  private setupSubscriptions () {
    observe(this.usersRepository, 'currentUser', (userDm) => {
      this.user = userDm.newValue;
    });
  }

  async load(callback?: (user: UserDm | null) => void) {
    let user = await this.usersRepository.getCurrentUser();
    this.user = user;
    callback && callback(this.user);
  }

  /**
   * @description This method registers the user and stores them in local state by using the userRepository.
   * We can integration test this functionality with various scenarios - for example, if the user is already 
   * registered and we have them stored to local state, skip re-registering with Google.
   */

  async registerWithGoogle () {
    try {
      // Check if user is already authenticated
      const currentUser = await this.usersRepository.getCurrentUser();
      console.log('currentuser', currentUser);
      if (currentUser?.isAuthenticated()) {
        // If already authenticated, just navigate to onboarding
        this.navigationService.navigate('/onboarding');
        return;
      }

      // Attempt Google sign in
      const userDm = await this.authService.signInWithGoogle();
      this.usersRepository.save(userDm);
      
      // Navigate to onboarding
      this.navigationService.navigate('/onboarding');

    } catch (err) {
      console.error('Auth error:', err);
      // Don't navigate on error
    }
  }
}

