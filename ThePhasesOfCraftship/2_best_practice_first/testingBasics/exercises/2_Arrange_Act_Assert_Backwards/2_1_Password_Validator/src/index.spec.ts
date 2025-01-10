import {
  Checked,
  lengthRestrictionError,
  numberRestrictionError,
  PasswordValidator,
  uppercaseRestrictionError
} from "./index";

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
    expect(result.errors).toContainEqual(numberRestrictionError)
    expect(result.result).toBeFalsy()
  })

  it('should know that "abc1E" is valid regarding to number policy', () => {

    const password = 'abc1E';

    const result: Checked = PasswordValidator.check(password);

    expect(result).toHaveProperty('result')
    expect(result.result).toBeTruthy()
  })

  it('should know that "1bcde" is not valid due to uppercase policy', () => {

    const password = '1bcde';

    const result: Checked = PasswordValidator.check(password);

    expect(result).toHaveProperty('result')
    expect(result).toHaveProperty('errors')
    expect(result.errors).toContainEqual(uppercaseRestrictionError)
    expect(result.result).toBeFalsy()
  })

  it('should know that "1bcdE" is valid regarding to uppercase policy', () => {

    const password = '1bcdE';

    const result: Checked = PasswordValidator.check(password);

    expect(result).toHaveProperty('result')
    expect(result.result).toBeTruthy()
  })

  it('should know that "maxwell1_c" is not valid due to uppercase policy', () => {

    const password = 'maxwell1_c';

    const result: Checked = PasswordValidator.check(password);

    expect(result).toHaveProperty('result')
    expect(result).toHaveProperty('errors')
    expect(result.errors).toContainEqual(uppercaseRestrictionError)
    expect(result.result).toBeFalsy()
  })

  it('should know that "maxwellTheBe" is not valid due to number policy', () => {

    const password = 'maxwellTheBe';

    const result: Checked = PasswordValidator.check(password);

    expect(result).toHaveProperty('result')
    expect(result).toHaveProperty('errors')
    expect(result.errors).toContainEqual(numberRestrictionError)
    expect(result.result).toBeFalsy()
  })

  it('should know that "thePhysical1234567" is not valid due to length policy', () => {

    const password = 'thePhysical1234567';

    const result: Checked = PasswordValidator.check(password);

    expect(result).toHaveProperty('result')
    expect(result).toHaveProperty('errors')
    expect(result.errors).toContainEqual(lengthRestrictionError)
    expect(result.result).toBeFalsy()
  })
})


