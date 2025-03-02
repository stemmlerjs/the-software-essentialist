import { OnboardingPresenter } from "../../modules/onboarding/onboardingPresenter";
import { RegistrationPresenter } from "../../modules/registration/registrationPresenter";

export class Presenters {
  constructor(
    public onboarding: OnboardingPresenter,
    public registration: RegistrationPresenter
  ) {}
} 