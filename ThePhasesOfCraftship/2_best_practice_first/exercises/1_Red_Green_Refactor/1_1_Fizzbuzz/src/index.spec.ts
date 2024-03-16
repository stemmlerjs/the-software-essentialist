import { FizzBuzz } from './fizzbuzz';

describe('fizzbuzz', () => {
  let fizzbuzz: FizzBuzz;

  beforeEach(() => {
    fizzbuzz = new FizzBuzz();
  });

  it.each([-5, 0, 101])('should not be able to execute on %i', (number) => {
    expect(() => fizzbuzz.execute(number)).toThrow();
  });

  it.each`
    number | expected
    ${1}   | ${'1'}
    ${2}   | ${'12'}
    ${3}   | ${'12Fizz'}
    ${5}   | ${'12Fizz4Buzz'}
    ${15}  | ${'12Fizz4BuzzFizz78FizzBuzz11Fizz1314FizzBuzz'}
    ${30}  | ${'12Fizz4BuzzFizz78FizzBuzz11Fizz1314FizzBuzz1617Fizz19BuzzFizz2223FizzBuzz26Fizz2829FizzBuzz'}
  `(
    'should be able to output "$expected" on number $number',
    ({ number, expected }) => {
      const result = fizzbuzz.execute(number);

      expect(result).toBe(expected);
    }
  );
});
