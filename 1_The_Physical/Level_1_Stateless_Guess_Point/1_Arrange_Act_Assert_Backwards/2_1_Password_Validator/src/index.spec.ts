
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
  

  // it(,  => {
  //   let output = PasswordValidator.validate('jamiE8');
  //   expect(output.result).toBeTruthy();
  //   expect(output.errors).toHaveLength(0);
  // })

  // it ('knows that "jaE8" is NOT between 5 and 15 characters long', () => {
  //   let output = PasswordValidator.validate('jaE8');
  //   expect(output.result).toBeFalsy();
  //   expect(output.errors).toHaveLength(1);
  //   expect(output.errors[0]).toEqual('InvalidLength')
  // });

  // it ('knows that "thePhysical1234567" is NOT between 5 and 15 characters long', () => {
  //   let output = PasswordValidator.validate('thePhysical1234567');
  //   expect(output.result).toBeFalsy();
  //   expect(output.errors).toHaveLength(1);
  //   expect(output.errors[0]).toEqual('InvalidLength')
  // });
  
})


