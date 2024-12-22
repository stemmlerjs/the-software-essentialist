import validatePassword from "./index";

describe('password validator', () => {


// Between 5 and 15 characters long
// Contains at least one digit
// Contains at least one upper case letter
// Return an object containing a boolean result and an errors key that — when provided with an invalid password — contains an error message or type for all errors in occurrence. There can be multiple errors at a single time.

const output= {
  result: false,
  errors:[
    {
      type: "length",
      message: "Password must be between 5 and 15 characters long"
    },
    {
      type: "digit",
      message: "Password must contain at least one digit"
    },
    {
      type: "upperCase",
      message: "Password must contain at least one upper case letter"
    },        
  ]
}


  test('provide a feedback if the password is valid or not, and a list of errors if not', () => {
    //Setup phase
    const password= "1234567890"

    //Execution phase
    const output = validatePassword(password);

    //Validate phase
    expect(output).toHaveProperty("result");
    expect(output).toHaveProperty("errors");

  })
})


