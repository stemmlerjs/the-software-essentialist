
import { makeAutoObservable } from "mobx";
import { AuthStore } from "@/services/auth/authStore";
import { MarketingService } from "@/services/marketing/marketingService";
import { NavigationStore } from "@/services/navigation/navigationStore";
import { Result } from '@dddforum/core'

interface OnboardingDetails {
  username: string;
  allowMarketing: boolean;
}

export class OnboardingPresenter {

  // All presenters have state on them that can be used to help present the
  // components. We can use the data stored here with our tests as well since these
  // presenters are the Application Layer (3) functionality (RDD-First).
  
  isSubmitting: boolean = false;
  error: string | null = null;

  constructor(
    private navigationStore: NavigationStore,
    private authStore: AuthStore,
    private marketingService: MarketingService
  ) {
    makeAutoObservable(this);
  }

  // This method is basically the application use case / vertical slice. 
  // We start with this as the main focus to get the logic down correctly.

  async registerMember(details: OnboardingDetails) {
    try {
      this.isSubmitting = true;
      this.error = null;

      const user = this.authStore.getCurrentUser();
      if (!user || !user.email) {
        this.error = 'No authenticated user found';
        return false;
      }

      const idToken = this.authStore.getToken();
      if (!idToken) {
        throw new Error("No authentication token found");
      }

      const [memberCreationResponse] = await Promise.all([
        this.authStore.createMember({
          username: details.username,
          email: user.email,
          userId: user.id,
          idToken,
        }),
        this.marketingService.addEmailToList(user.email)
      ]);

      if (memberCreationResponse.success) {
        this.navigationStore.navigate('/');
        return true;
      }
      
      this.error = memberCreationResponse.error?.message || "Failed to register member";
      return false;
    } catch (error) {
      this.error = error instanceof Error ? error.message : "An error occurred";
      return false;
    } finally {
      this.isSubmitting = false;
    }
  }
}