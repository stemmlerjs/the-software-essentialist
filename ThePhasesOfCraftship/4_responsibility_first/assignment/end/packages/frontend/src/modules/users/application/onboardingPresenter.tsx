import { makeAutoObservable } from "mobx";
import { AuthRepository } from "../repos/authRepository";
import { NavigationService } from "../../../shared/navigation/navigationService";
import { FirebaseService } from "../externalServices/firebaseService";
import { MembersRepo } from "../../members/repos/membersRepo";
import { MemberDm } from "../../members/domain/memberDm";
import { apiClient } from "../../../main";

interface OnboardingDetails {
  username: string;
  email: string;
  userId: string;
  allowMarketing: boolean;
}

export class OnboardingPresenter {
  // All presenters have state on them that can be used to help present the
  // components. We can use the data stored here with our tests as well since these
  // presenters are the Application Layer (3) functionality (RDD-First).
  isSubmitting: boolean = false;
  error: string | null = null;

  constructor(
    private membersRepo: MembersRepo,
    private navigationService: NavigationService,
    private firebaseService: FirebaseService
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

      // Register member
      const registerMemberResponse = await apiClient.members.create({
        username: details.username,
        email: details.email,
        userId: details.userId
      }, idToken);

      // Handle marketing preferences if opted in
      if (details.allowMarketing) {
        await apiClient.marketing.addEmailToList(details.email);
      }

      if (registerMemberResponse.success && registerMemberResponse.data) {
        // Create and store member in repo
        const member = new MemberDm({
          id: registerMemberResponse.data.memberId,
          username: details.username,
          email: details.email,
          userId: details.userId
        });
        
        // This should store the member to global state / store (just like every time
        // we store something to the repo should).

        this.membersRepo.save(member);
        this.navigationService.goTo('/');
        return true;
      }
      
      this.error = registerMemberResponse.error || "Failed to register member";
      return false;
    } catch (error) {
      this.error = error instanceof Error ? error.message : "An error occurred";
      return false;
    } finally {
      this.isSubmitting = false;
    }
  }
}