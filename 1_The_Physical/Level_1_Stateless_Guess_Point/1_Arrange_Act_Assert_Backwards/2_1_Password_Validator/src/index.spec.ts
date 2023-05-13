
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
})


