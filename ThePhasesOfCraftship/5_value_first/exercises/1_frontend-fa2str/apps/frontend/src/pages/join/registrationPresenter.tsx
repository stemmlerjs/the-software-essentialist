
import { NavigationService } from '@/modules/navigation/navigationService';
import { makeAutoObservable, observe } from "mobx";
import { AuthStore } from '@/services/auth/authStore';
import { UserDm } from '@/modules/members/domain/userDm';

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
    observe(this.authStore, 'currentUser', (userDm) => {
      this.user = userDm.newValue;
    });
  }

  async load(callback?: (user: UserDm | null) => void) {
    let user = await this.authStore.getCurrentUser();
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
      if (this.authStore.isAuthenticated()) {
        // If already authenticated, just navigate to onboarding
        this.navigationService.navigate('/onboarding');
        return;
      }

      // Attempt Google sign in
      const userDm = await this.authStore.signInWithGoogle();
      this.authStore.saveUserDetails(userDm);
      
      // Navigate to onboarding
      this.navigationService.navigate('/onboarding');

    } catch (err) {
      console.error('Auth error:', err);
      // Don't navigate on error
    }
  }
}

