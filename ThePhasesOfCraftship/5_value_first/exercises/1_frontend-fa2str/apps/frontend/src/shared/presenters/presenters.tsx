
import { OnboardingPresenter } from "@/pages/onboarding/onboardingPresenter.js";
import { PostsPresenter } from "../../modules/posts/application/postsPresenter.js";
import { RegistrationPresenter } from "@/pages/join/registrationPresenter.js";
import { SubmissionPresenter } from "@/pages/submission/application/submissionPresenter.js";
import { LayoutPresenter } from "../layout/layoutPresenter.js";

export class Presenters {
  constructor(
    public onboarding: OnboardingPresenter,
    public registration: RegistrationPresenter,
    public posts: PostsPresenter,
    public submission: SubmissionPresenter,
    public layout: LayoutPresenter
  ) {}
} 
