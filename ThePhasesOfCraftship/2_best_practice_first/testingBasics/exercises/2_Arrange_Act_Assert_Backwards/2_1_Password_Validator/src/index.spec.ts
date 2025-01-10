import {Checked, lengthRestrictionError, PasswordValidator} from "./index";

describe('password validator', () => {

  it('should know that "aA1" is not valid due to length policy', () => {

    const password = 'aA1';

    const result: Checked = PasswordValidator.check(password);

    expect(result).toHaveProperty('result')
    expect(result).toHaveProperty('errors')
    expect(result.errors).toContainEqual(lengthRestrictionError)
    expect(result.result).toBeFalsy()
  })

  it('should know that "abc1E" is valid regarding to length policy', () => {

    const password = 'abc1E';

    const result: Checked = PasswordValidator.check(password);

    expect(result).toHaveProperty('result')
    expect(result.result).toBeTruthy()
  })

  it('should know that "abcdefFGhi12345678" is not valid due to length policy', () => {

    const password = 'abcdefFGhi12345678';

    const result: Checked = PasswordValidator.check(password);

    expect(result).toHaveProperty('result')
    expect(result).toHaveProperty('errors')
    expect(result.errors).toContainEqual(lengthRestrictionError)
    expect(result.result).toBeFalsy()
  })

  it('should know that "abcde" is not valid due to number policy', () => {

    const password = 'abcde';

    const result: Checked = PasswordValidator.check(password);

    expect(result).toHaveProperty('result')
    expect(result).toHaveProperty('errors')
    expect(result.errors).toContainEqual({
      type: 'missingNumber',
      message: 'Should contain at least one numeric character'
    })
    expect(result.result).toBeFalsy()
  })
})


