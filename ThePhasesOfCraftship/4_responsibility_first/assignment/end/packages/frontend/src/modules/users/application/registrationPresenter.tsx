import { UsersRepository } from "../repos/usersRepo";
import { UserCredential } from 'firebase/auth';
import { UserDm } from "../domain/userDm";
import { NavigateFunction } from "react-router-dom";
import { FirebaseService } from "../externalServices/firebaseService";
import { NavigationService } from "../../../shared/navigation/navigationService";
import { makeAutoObservable, observe } from "mobx";

export class RegistrationPresenter {

  public user: UserDm | null;

  constructor (
    public usersRepository: UsersRepository,
    public navigationService: NavigationService,
    public firebaseService: FirebaseService
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

  async registerWithGoogle (navigate: NavigateFunction) {
    try {
      // Check if user is already authenticated
      const currentUser = await this.usersRepository.getCurrentUser();
      console.log('currentuser', currentUser);
      if (currentUser?.isAuthenticated()) {
        // If already authenticated, just navigate to onboarding
        this.navigationService.goTo('/onboarding', navigate);
        return;
      }

      // Attempt Google sign in
      const userCredential: UserCredential = await this.firebaseService.signInWithGoogle();
      
      // Create and save user domain model
      const userDm = UserDm.fromFirebaseCredentials(userCredential);
      this.usersRepository.save(userDm);
      
      // Navigate to onboarding
      this.navigationService.goTo('/onboarding', navigate);

    } catch (err) {
      console.error('Auth error:', err);
      // Don't navigate on error
    }
  }
}

