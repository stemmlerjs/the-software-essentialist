
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

  it('knows that "Khalil8" contains at least one digit', () => {
    let output = PasswordValidator.validate('Khalil8');
    expect(output.result).toBeTruthy();
    expect(output.errors).toHaveLength(0);
  });
  
  it ('knows that "khalil" does not contain at least one digit', () => {
    let output = PasswordValidator.validate('khalil');
    expect(output.result).toBeFalsy();
    expect(output.errors).toHaveLength(1);
    expect(output.errors).toStrictEqual(['NoDigitIncluded']);
  });

  // it ('knows that "maxwellTheBe" does not contain at least one digit', () => {});

})


