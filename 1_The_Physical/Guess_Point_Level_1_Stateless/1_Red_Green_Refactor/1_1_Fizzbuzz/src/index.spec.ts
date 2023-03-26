import { fizzBuzz } from './fizzbuzz';

describe('fizzbuzz', () => {
  test('Function output is string', () => {
    const result = fizzBuzz(5);
    expect(typeof result).toBe('string');
  });

  test('Function output is "Fizz" when input is divisible by 3', () => {
    const result = fizzBuzz(3);
    expect(result).toBe('Fizz');
  });

  test('Function output is "Buzz" when input is divisible by 5', () => {
    const result = fizzBuzz(5);
    expect(result).toBe('Buzz');
  });

  test('Function output is "FizzBuzz" when input is divisible by 3 and 5', () => {
    const result = fizzBuzz(15);
    expect(result).toBe('FizzBuzz');
  });
});
