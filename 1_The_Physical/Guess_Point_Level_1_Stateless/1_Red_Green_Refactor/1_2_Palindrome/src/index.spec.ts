// @ts-nocheck
import { palindromeChecker } from './index';

describe('palindrome checker', () => {
  // TODO: accepts a string and returns a boolean
  it('should accept a string and return a boolean', () => {
    expect(palindromeChecker('mom')).toBe(true);
  });
  // TODO: throws an error if there is no input or input is not a string or string contains less than 3 characters
  it('should throw an error if input is invalid', () => {
    expect(() => palindromeChecker()).toThrowError('Input should be provided');
    expect(() => palindromeChecker(3)).toThrowError('Input should be a string');
    expect(() => palindromeChecker('   ')).toThrowError('Input should contain at least 3 letters');
  });
  // TODO: returns true if the input is a palindrome and false if not
  // TODO: returns true if the input is a palindrome with different letter cases
  // TODO: returns true if the input is a palindrome with spaces
});
