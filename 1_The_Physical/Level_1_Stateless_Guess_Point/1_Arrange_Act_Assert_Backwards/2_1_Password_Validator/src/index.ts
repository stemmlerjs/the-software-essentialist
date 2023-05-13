
export class PasswordValidator {

  public static validate (password: string) {

    let errors = [];
    let passwordHasDigits = password.split("").find((char) => !isNaN(Number(char))) !== undefined;
    let isBetweenFiveAndFifteen = password.length >= 5 
      && password.length <= 15;

    if (!isBetweenFiveAndFifteen) errors.push('InvalidLength')
    if (!passwordHasDigits) errors.push('NoDigitIncluded')

    return {
      result: errors.length === 0,
      errors
    }
  }
}