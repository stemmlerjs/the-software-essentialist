import {
  Checked,
  lengthRestrictionError,
  numberRestrictionError,
  PasswordValidator, PasswordValidatorError,
  uppercaseRestrictionError
} from "./index";


const length = 'length';
const number = 'number';
const uppercase = 'uppercase';

describe('password validator', () => {

  const falsyCases: [string, string, PasswordValidatorError][] = [
      ['aA1', length, lengthRestrictionError],
      ['abcdefFGhi12345678', length, lengthRestrictionError],
      ['abCde', number, numberRestrictionError],
      ['1bcde', uppercase, uppercaseRestrictionError],
      ['maxwell1_c', uppercase, uppercaseRestrictionError],
      ['maxwellTheBe', number, numberRestrictionError],
      ['thePhysical1234567', length, lengthRestrictionError],
  ]

  test.each(falsyCases)('should know that \"%s\" is not valid regarding to %s policy', (input, policy, error) => {
    const result = PasswordValidator.check(input);
    expect(result).toHaveProperty('result')
    expect(result).toHaveProperty('errors')
    expect(result.errors).toContainEqual(error)
    expect(result.result).toBeFalsy()
  })

  const truthyCases: [string, string][] = [
      ['abc1E', length ],
      ['abc1E', number ],
      ['1bcdE', uppercase]
  ]

  test.each(truthyCases)('should know that \"%s\" is valid regarding to %s policy', (password, policy) => {
    const result = PasswordValidator.check(password);
    expect(result).toHaveProperty('result')
    expect(result.errors).toBe(undefined)
    expect(result.result).toBeTruthy()
  })
})


