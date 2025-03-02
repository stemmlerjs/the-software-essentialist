import { makeAutoObservable } from "mobx";
import { UsersRepository } from "../repos/usersRepo";
import { NavigationService } from "../../../shared/navigation/navigationService";
import { FirebaseService } from "../externalServices/firebaseService";
import { AuthStore } from "../../../shared/auth/authStore";

interface OnboardingDetails {
  username: string;
  email: string;
  userId: string;
  allowMarketing: boolean;
}

export class OnboardingPresenter {
  isSubmitting: boolean = false;
  error: string | null = null;

  constructor(
    private usersRepository: UsersRepository,
    private navigationService: NavigationService,
    private firebaseService: FirebaseService,
    private authStore: AuthStore
  ) {
    makeAutoObservable(this);
  }

  async registerMember(details: OnboardingDetails) {
    try {
      this.isSubmitting = true;
      this.error = null;

      const user = await this.firebaseService.getCurrentUser();
      const idToken = await user?.getIdToken();
      if (!idToken) {
        throw new Error("No authentication token found");
      }

      const response = await this.usersRepository.register({
        username: details.username,
        email: details.email,
        userId: details.userId,
        idToken
      });

      if (response.success) {
        // Get updated user with member details
        const user = await this.usersRepository.getCurrentUser();
        this.authStore.setCurrentUser(user);
        
        this.navigationService.goTo('/');
        return true;
      }
      
      this.error = response.error || "Failed to register member";
      return false;

    } catch (error) {
      this.error = error instanceof Error ? error.message : "An error occurred";
      return false;
    } finally {
      this.isSubmitting = false;
    }
  }
}