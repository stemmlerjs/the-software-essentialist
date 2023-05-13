
import { PasswordValidator } from './index'

describe('password validator', () => {
  it('knows that "jamiE8" is between 5 and 15 characters long', () => {
    let output = PasswordValidator.validate('jamiE8');
    expect(output.result).toBeTruthy();
    expect(output.errors).toHaveLength(0);
  })

  it ('knows that "jaE8" is NOT between 5 and 15 characters long', () => {
    let output = PasswordValidator.validate('jaE8');
    expect(output.result).toBeFalsy();
    expect(output.errors).toHaveLength(1);
    expect(output.errors[0]).toEqual('InvalidLength')
  })
})


