import validatePassword from "./index";
import type { PasswordValidationError } from "./index";
import { PasswordValidationErrorType } from "./index";

const hasErrorType = (errors: PasswordValidationError[], type: PasswordValidationErrorType) => {
  return errors.some(error => error.type === type);
}

describe('Password validator', () => {


// Between 5 and 15 characters long
// Contains at least one digit
// Contains at least one upper case letter
// Return an object containing a boolean result and an errors key that — when provided with an invalid password — contains an error message or type for all errors in occurrence. There can be multiple errors at a single time.


  test('provide a feedback if the password is valid or not, and a list of errors if not', () => {
    const password= "1234567890"

    const output = validatePassword(password);

    expect(output).toHaveProperty("result");
    expect(output).toHaveProperty("errors");

  })

  test('fails verification if password is under 5 characters long or over 15 characters long', ()=>{
    const passwords= ["1234", "234324sdfasdf23443432"]

    for(const password of passwords){
      const output = validatePassword(password);

      expect(output.result).toBeFalsy();
      expect(output.errors.length > 0).toBeTruthy();
      expect(hasErrorType(output.errors, PasswordValidationErrorType.LENGTH)).toBeTruthy();
    }
  })

  test('fails verification if password does not contain at least one digit', ()=>{
    const passwords = ["asdf", "asdfasdf", "asdfasdfasdfasDSFdf"]

    for(const password of passwords){
      const output = validatePassword(password);

      expect(output.result).toBeFalsy();
      expect(output.errors.length > 0).toBeTruthy();
      expect(hasErrorType(output.errors, PasswordValidationErrorType.DIGIT)).toBe(true);
    }
  })

  test('fails verification if password does not contain at least one uppercase letter', ()=>{
    const passwords = ["asdf", "asdfasdf", "asdfasdfasdfasdf"]

    for(const password of passwords){
      const output = validatePassword(password);

      expect(output.result).toBe(false);
      expect(output.errors).toBeTruthy()
      expect(hasErrorType(output.errors, PasswordValidationErrorType.UPPERCASE)).toBeTruthy()
    }
  })
})

