
export class PasswordValidator {

  public static validate (password: string) {

    let errors = [];
    let isBetweenFiveAndFifteen = password.length >= 5 
      && password.length <= 15;

    if (!isBetweenFiveAndFifteen) errors.push('InvalidLength')

    return {
      result: errors.length === 0,
      errors
    }
  }
}