import validatePassword from "./index";

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

  test('fails verification if password is not between 5 and 15 characters long', ()=>{
    const password= "1234"
    const output = validatePassword(password);

    expect(output.result).toBe(false);
    expect(output.errors).toHaveLength(1);
    expect(output.errors[0].type).toBe("length");

  })
})


