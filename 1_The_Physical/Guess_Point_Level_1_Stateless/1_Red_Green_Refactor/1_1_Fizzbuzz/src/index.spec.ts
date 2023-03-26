// @ts-nocheck
import { fizzbuzz } from './fizzbuzz';

describe('fizzbuzz', () => {
  // TODO: accepts numbers as arguments and returns its string representation
  it('accepts number as argument and returns its string representation', () => {
    expect(typeof fizzbuzz(1)).toBe('string');
    expect(typeof fizzbuzz(27)).toBe('string');

    expect(fizzbuzz(8)).toBe('8');
    expect(fizzbuzz(41)).toBe('41');
  });
  // TODO: it throws "Invalid input" error when called without argument or with non-number argument
  it('throws error when called without argument or with non-number', () => {
    expect(() => fizzbuzz()).toThrowError('Invalid input');
    expect(() => fizzbuzz('10')).toThrowError('Invalid input');
  });
  // TODO: requires numbers to between 1 and 100 only, throws "Input is out of 1 to 100 range"
  // TODO: returns "Fizz" for multiples of 3
  // TODO: returns "Buzz" for multiples of 5
  // TODO: returns "FizzBuzz" for multiples of 3 and 5
});
