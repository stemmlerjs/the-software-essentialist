type ValidationError = {
  type: string;
  message: string;
};

export class PasswordValidator {
  validatePassword(password: string) {
    let errors: ValidationError[] = [];

    if (password.length < 5 || password.length > 15) {
      errors.push({
        type: 'IncorrectPasswordLength',
        message: 'Password must contain between 5 and 15 characters',
      });
    }

    if (!/\d/.test(password)) {
      errors.push({
        type: 'PasswordMustHaveAtLeastOneDigit',
        message: 'The password must have at least 1 digit',
      });
    }

    if (!/[A-Z]/.test(password)) {
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
