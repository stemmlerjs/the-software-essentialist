/// <reference types="jest" />
import { fizzbuzz } from './fizzbuzz';

describe('fizzbuzz', () => {
  // TODO: accepts numbers as arguments and returns its string representation
  it('accepts number as argument and returns its string representation', () => {
    expect(typeof fizzbuzz(1)).toBe('string');
    expect(typeof fizzbuzz(27)).toBe('string');

    expect(fizzbuzz(8)).toBe('8');
    expect(fizzbuzz(41)).toBe('41');
  });
  // TODO: requires at least one argument, returns "Invalid input" on zero arguments
  // TODO: requires numbers to between 1 and 100 only, throws "Invalid input" on out-of-range numbers
  // TODO: returns "Fizz" for multiples of 3
  // TODO: returns "Buzz" for multiples of 5
  // TODO: returns "FizzBuzz" for multiples of 3 and 5
});
