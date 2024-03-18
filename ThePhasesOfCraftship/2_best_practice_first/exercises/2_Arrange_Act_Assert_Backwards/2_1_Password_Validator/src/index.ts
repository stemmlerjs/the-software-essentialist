export class PasswordValidator {
  validatePassword(password: string) {
    if (password.length < 5 || password.length > 15) {
      return {
        result: false,
        errors: [
          {
            type: 'IncorrectPasswordLength',
            message: 'Password must contain between 5 and 15 characters',
          },
        ],
      };
    }

    if (!/\d/.test(password)) {
      return {
        result: false,
        errors: [
          {
            type: 'PasswordMustHaveAtLeastOneDigit',
            message: 'The password must have at least 1 digit',
          },
        ],
      };
    }

    if (!/[A-Z]/.test(password)) {
      return {
        result: false,
        errors: [
          {
            type: 'PasswordMustHaveAtLeastOneUpperCaseLetter',
            message: 'The password must have at least 1 upper case letter',
          },
        ],
      };
    }

    return {
      result: true,
    };
  }
}
