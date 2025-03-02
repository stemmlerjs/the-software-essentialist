
import { makeAutoObservable } from "mobx";
import { NavigationService } from "../../../shared/navigation/navigationService";
import { FirebaseService } from "../externalServices/firebaseService";
import { MembersRepo } from "../../members/repos/membersRepo";
import { MemberDm } from "../../members/domain/memberDm";
import { apiClient } from "../../../main";

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
    private membersRepo: MembersRepo,
    private navigationService: NavigationService,
    private firebaseService: FirebaseService
  ) {
    makeAutoObservable(this);
  }

  testUpdateMember () {
    console.log('test');
    const member = new MemberDm({
      id: 'asda',
      username: 'khalil',
      email: 'mtroidman@gmail',
      userId: '2342343'
    })
    this.membersRepo.save(member)
  }

  async registerMember(details: OnboardingDetails) {
    try {
      this.isSubmitting = true;
      this.error = null;

      const user = await this.firebaseService.getCurrentUser();
      if (!user || !user.email) {
        this.error = 'No authenticated user found';
        return false;
      }

      const idToken = await user.getIdToken();
      if (!idToken) {
        throw new Error("No authentication token found");
      }

      const registerMemberResponse = await apiClient.members.create({
        username: details.username,
        email: user.email,
        userId: user.uid
      }, idToken);

      if (details.allowMarketing) {
        await apiClient.marketing.addEmailToList(user.email);
      }

      if (registerMemberResponse.success && registerMemberResponse.data) {
        const member = new MemberDm({
          id: registerMemberResponse.data.memberId,
          username: details.username,
          email: user.email,
          userId: user.uid
        });

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