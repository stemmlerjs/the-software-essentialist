
import { PasswordValidator } from './index'

describe('password validator', () => {
  describe('checking between 5 and 15 characters long', () => {
    it.each([
      ['jamiE8', true, []],
      ['jaE8', false, ['InvalidLength']],
      ['thePhysical1234567', false, ['InvalidLength']]
    ])('knows that "%s" should return %s', 
      (input: string, result: boolean, errors: string[]) => {
        let output = PasswordValidator.validate(input);
        expect(output.result).toBe(result)
        expect(output.errors).toHaveLength(errors.length);
        expect(output.errors).toStrictEqual(errors);
    });
  })

  describe('checks for at least one digit', () => {
    it.each([
      ['Khalil8', true, []],
      ['khalil', false, ['NoDigitIncluded']],
      ['maxwellTheBe', false, ['NoDigitIncluded']]
    ])('knows that "%s" should return %s', 
      (input: string, result: boolean, errors: string[]) => {
        let output = PasswordValidator.validate(input);
        expect(output.result).toBe(result)
        expect(output.errors).toHaveLength(errors.length);
        expect(output.errors).toStrictEqual(errors);
    });
  })

  describe('can detect multiple errors', () => {
    it.each([
      ['k', false, ['NoDigitIncluded', 'InvalidLength']],
      ['k8', false, ['InvalidLength']],
      ['kjsdkjdjkhfjhgfkjhkjhsd', false, ['InvalidLength', 'NoDigitIncluded']]
    ])('knows that "%s" should return %s', 
      (input: string, result: boolean, errors: string[]) => {
        let output = PasswordValidator.validate(input);
        expect(output.result).toBe(result)
        expect(output.errors).toHaveLength(errors.length);
        output.errors.forEach((productionCodeError) => expect(errors).toContain(productionCodeError))
    });
  })
})


