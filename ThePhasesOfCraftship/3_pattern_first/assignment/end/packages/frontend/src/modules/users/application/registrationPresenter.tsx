
import { CreateUserErrors, CreateUserParams, CreateUserResponse, EmailAlreadyInUseError, UsernameAlreadyTakenError } from "@dddforum/shared/src/api/users";
import { ToastService } from "../../../shared/services/toastService";
import { UsersRepository } from "../repos/usersRepo";
import { MarketingService } from "../../../shared/services/marketingService";
import { NavigationRepository } from "../../navigation/repos/navigationRepository";
import { ServerError, ValidationError } from "@dddforum/shared/src/api";

type ValidationResult = {
  success: boolean;
  errorMessage?: string;
}

function validateForm (input: CreateUserParams): ValidationResult {
  if (input.email.indexOf('@') === -1) return { success: false, errorMessage: "Email invalid" };
  if (input.username.length < 2) return { success: false, errorMessage: "Username invalid" };
  return { success: true }
}

export class RegistrationPresenter {

  constructor (
    public toastService: ToastService,
    public usersRepository: UsersRepository,
    public marketingService: MarketingService,
    public navigationRepository: NavigationRepository
  ) {

  }

  async submitForm (input: CreateUserParams, allowMarketingEmails: boolean, callbacks?: { 
    onStart: () => void, 
    onSuccess: () => void, 
    onFailure: () => void 
  }): Promise<CreateUserResponse | ValidationError | UsernameAlreadyTakenError | EmailAlreadyInUseError | ServerError> {
    // Validate the form
    const validationResult = validateForm(input);

    // If the form is invalid
    if (!validationResult.success) {
      // Show an error toast (for invalid input)
      this.toastService.showError(validationResult.errorMessage as string);
      return 'ValidationError';
    }

    callbacks?.onStart();

    try {
      const response = await this.usersRepository.register(input);
      
      if (!response.success) {
        switch (response.error.code) {
          case "UsernameAlreadyTaken":
            callbacks?.onFailure()
            this.toastService.showError('Account already exists');
            return 'UsernameAlreadyTaken'
          case "EmailAlreadyInUse":
            callbacks?.onFailure()
            this.toastService.showError('Email already in use');
            return 'EmailAlreadyInUse';
          default:
            // Client processing error
            throw new Error('Unknown error: ' + response.error.code)
        }
      }
      
      if (allowMarketingEmails) {
        await this.marketingService.addEmailToList(input.email);
      }

      // Stop the loading spinner
      callbacks?.onSuccess();
      // Show the toast
      this.toastService.showSuccess('Success! Redirecting home.')
      // In 3 seconds, redirect to the main page
      this.navigationRepository.goTo('/', { inSeconds: 3000 });

      return response;

    } catch (err) {
      // If the call failed, stop the spinner
      callbacks?.onFailure();
      // Show the toast (for unknown error)
      this.toastService.showError('Some backend error occurred')
      return 'ServerError';
    }
  }
}

