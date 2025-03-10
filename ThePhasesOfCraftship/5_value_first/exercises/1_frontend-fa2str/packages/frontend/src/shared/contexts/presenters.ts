import { OnboardingPresenter } from "../../modules/onboarding/onboardingPresenter";
import { PostsPresenter } from "../../modules/posts/application/postsPresenter";
import { RegistrationPresenter } from "../../modules/registration/registrationPresenter";
import { SubmissionPresenter } from "../../modules/submission/application/submissionPresenter";

export class Presenters {
  constructor(
    public readonly onboardingPresenter: OnboardingPresenter,
    public readonly registrationPresenter: RegistrationPresenter,
    public readonly postsPresenter: PostsPresenter,
    public readonly submissionPresenter: SubmissionPresenter
  ) {}
} 