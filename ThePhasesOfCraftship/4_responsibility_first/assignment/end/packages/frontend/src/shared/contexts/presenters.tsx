import { OnboardingPresenter } from "../../modules/onboarding/onboardingPresenter";
import { PostsPresenter } from "../../modules/posts/application/postsPresenter";
import { RegistrationPresenter } from "../../modules/registration/registrationPresenter";

export class Presenters {
  constructor(
    public onboarding: OnboardingPresenter,
    public registration: RegistrationPresenter,
    public posts: PostsPresenter
  ) {}
} 
