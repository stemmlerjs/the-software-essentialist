
import { MissingValueError } from "../errors/missingValueError";
import { ValidationError } from "../errors/validationError";
import { Guard } from "./guard";

describe("guard", () => {
  it('knows that the key "id" is not in { user, firstName }', () => {
    let guardResult = Guard.againstNullOrUndefinedValues(
      { user: "", firstName: "" },
      ["id"]
    );

    expect(guardResult.isSuccess()).toBeFalsy();
    expect(guardResult.hasErrors()).toBeTruthy();
    expect((guardResult.getError() as MissingValueError[])[0].getErrorType()).toEqual('MissingValue');    
  });


  it ('returns the first validation error from a list of potential validation errors', () => {
    let validationErrorsGuardResult = Guard.againstValidationErrors([
      '',
      new Object(),
      {},
      new ValidationError('user'),
      new ValidationError('max'),
    ]);

    expect(validationErrorsGuardResult.hasErrors()).toBeTruthy();
    expect((validationErrorsGuardResult.getError() as ValidationError[])[0].getErrorType()).toEqual('ValidationError');  
    expect((validationErrorsGuardResult.getError() as ValidationError[])[0].getMessage()).toContain('user')
  })

});
