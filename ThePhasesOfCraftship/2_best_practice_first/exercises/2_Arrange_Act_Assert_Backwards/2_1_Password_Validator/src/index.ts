type ValidationError = {
  type: string;
  message: string;
};

export class PasswordValidator {
  validatePassword(password: string) {
    let errors: ValidationError[] = [];

    const MIN_LENGTH = 5;
    const MAX_LENGTH = 15;

    if (password.length < MIN_LENGTH || password.length > MAX_LENGTH) {
      errors.push({
        type: 'IncorrectPasswordLength',
        message: 'Password must contain between 5 and 15 characters',
      });
    }

    if (!hasAtLeast1Digit(password)) {
      errors.push({
        type: 'PasswordMustHaveAtLeastOneDigit',
        message: 'The password must have at least 1 digit',
      });
    }

    if (!hasAtLeast1UpperCase(password)) {
      errors.push({
        type: 'PasswordMustHaveAtLeastOneUpperCaseLetter',
        message: 'The password must have at least 1 upper case letter',
      });
    }

    const hasErrors = errors.length > 0;

    return hasErrors
      ? {
          result: false,
          errors,
        }
      : {
          result: true,
        };
  }
}

function hasAtLeast1Digit(str: string) {
  return /\d/.test(str);
}

function hasAtLeast1UpperCase(str: string) {
  return /[A-Z]/.test(str);
}
