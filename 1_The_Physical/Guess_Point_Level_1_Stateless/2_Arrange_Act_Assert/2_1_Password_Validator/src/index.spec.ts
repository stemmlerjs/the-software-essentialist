import { describe, test, expect } from '@jest/globals';
 import { validatePassword } from "./password_validate";

describe('password validator', () => {
 test('test input aa returns object with 3 errors', () => {
   expect(validatePassword("aa"))
     .toMatchObject({
       isValid: false
       , errors: [
          'Password should be between 5 and 15 characters long',
          'Password should contain atleast 1 digit',
          'Password should contain at least one upper case letter'
        ]
     })
  });

  test('test input abcde returns object with 2 errors', () => {
    expect(validatePassword("abcde"))
      .toMatchObject({
        isValid: false,
          errors: [
            'Password should contain atleast 1 digit',
            'Password should contain at least one upper case letter'
          ]
      });
  });

  test('test input abCde returns object with 1 error', () => {
    expect(validatePassword("abCde"))
      .toMatchObject({
        isValid: false,
        errors: [ 'Password should contain atleast 1 digit' ]
      });
  });

  test('test input number 3 returns object with 0 error', () => {
    expect(validatePassword("abCde1"))
      .toMatchObject({ isValid: true, errors: [] });
});
})

