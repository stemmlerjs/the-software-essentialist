// @ts-nocheck
import { palindromeChecker } from './index';

describe('palindrome checker', () => {
  it('should accept a string and return a boolean', () => {
    expect(palindromeChecker('mom')).toBe(true);
  });

  it('should throw an error if input is invalid', () => {
    expect(() => palindromeChecker()).toThrowError('Input should be provided');
    expect(() => palindromeChecker(3)).toThrowError('Input should be a string');
    expect(() => palindromeChecker('   ')).toThrowError('Input should contain at least 3 letters');
  });

  it('should return true if the input string is a palindrome and false if not', () => {
    expect(palindromeChecker('dad')).toBe(true);
    expect(palindromeChecker('tom')).toBe(false);
    expect(palindromeChecker('racecar')).toBe(true);
    expect(palindromeChecker('tact')).toBe(false);
  });

  it('should identify a palindrome even if the casing is off', () => {
    expect(palindromeChecker('Mom')).toBe(true);
    expect(palindromeChecker('Dad')).toBe(true);
    expect(palindromeChecker('RaceCar')).toBe(true);
  });

  it('should identify phrase/statement palindromes', () => {
    expect(palindromeChecker('Was It A Rat I Saw')).toBe(true);
    expect(palindromeChecker('Was It a Chainsaw')).toBe(false);
    expect(palindromeChecker('Step On No Pets')).toBe(true);
    expect(palindromeChecker('Step On Pads')).toBe(false);
    expect(palindromeChecker('Never Odd or Even')).toBe(true);
    expect(palindromeChecker('Newer Ode to Evening')).toBe(false);
    expect(palindromeChecker('No lemon, no melon')).toBe(true);
    expect(palindromeChecker('No money, no hohey')).toBe(false);
  });
});
