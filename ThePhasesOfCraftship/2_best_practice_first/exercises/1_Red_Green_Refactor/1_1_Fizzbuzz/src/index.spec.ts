import { fizzbuzz } from './fizzbuzz';

describe('fizzbuzz', () => {
  it('returns a string', () => {
    expect(typeof fizzbuzz(5)).toBe('string');
  });

  it("returns 'Fizz' when the input is 3", () => {
    expect(fizzbuzz(3)).toBe('Fizz');
  });

  it("returns 'Buzz' when the input is 5", () => {
    expect(fizzbuzz(5)).toBe('Buzz');
  });

  it("returns 'FizzBuzz' when the input is 15", () => {
    expect(fizzbuzz(15)).toBe('FizzBuzz');
  });
});
