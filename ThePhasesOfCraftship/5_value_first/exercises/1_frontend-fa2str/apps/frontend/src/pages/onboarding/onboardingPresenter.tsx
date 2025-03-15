
import { makeAutoObservable } from "mobx";
import { NavigationService } from "@/modules/navigation/navigationService";
import { MemberDm } from "@/modules/members/domain/memberDm";
import { AuthStore } from "@/services/auth/auth/authStore";

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
    private navigationService: NavigationService,
    private authStore: AuthStore
  ) {
    makeAutoObservable(this);
  }

  testUpdateMember () {
    const member = new MemberDm({
      id: 'asda',
      username: 'khalil',
      email: 'mtroidman@gmail',
      userId: '2342343'
    })
    this.authStore.saveMemberDetails(member);
    console.log('saved member in onboarding presenter')
  }

  async registerMember(details: OnboardingDetails) {
    try {
      this.isSubmitting = true;
      this.error = null;

      const user = await this.authStore.getCurrentUser();
      if (!user || !user.email) {
        this.error = 'No authenticated user found';
        return false;
      }

      const idToken = await this.authStore.getToken();
      if (!idToken) {
        throw new Error("No authentication token found");
      }

      const result = await this.authStore.createMember({
        username: details.username,
        email: user.email,
        userId: user.id,
        idToken,
        allowMarketing: details.allowMarketing
      });

      if (result.success) {
        this.navigationService.navigate('/');
        return true;
      }
      
      this.error = result.error?.message || "Failed to register member";
      return false;
    } catch (error) {
      this.error = error instanceof Error ? error.message : "An error occurred";
      return false;
    } finally {
      this.isSubmitting = false;
    }
  }
}