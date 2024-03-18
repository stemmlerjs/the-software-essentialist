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

    return {
      result: true,
    };
  }
}
