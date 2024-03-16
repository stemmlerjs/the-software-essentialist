import { FizzBuzz } from './fizzbuzz';

describe('fizzbuzz', () => {
  let fizzbuzz: FizzBuzz;

  beforeEach(() => {
    fizzbuzz = new FizzBuzz();
  });

  it('should not be able to execute on -5', () => {
    const number = -5;

    expect(() => fizzbuzz.execute(number)).toThrow();
  });

  it('should not be able to execute on 0', () => {
    const number = 0;

    expect(() => fizzbuzz.execute(number)).toThrow();
  });

  it('should not be able to execute on 101', () => {
    const number = 101;

    expect(() => fizzbuzz.execute(number)).toThrow();
  });

  it('should be able to output "1" on number 1', () => {
    const number = 1;

    const result = fizzbuzz.execute(number);

    expect(result).toBe('1');
  });

  it('should be able to output "12" on number 2', () => {
    const number = 2;

    const result = fizzbuzz.execute(number);

    expect(result).toBe('12');
  });

  it('should be able to output "12Fizz" on number 3', () => {
    const number = 3;

    const result = fizzbuzz.execute(number);

    expect(result).toBe('12Fizz');
  });

  it('should be able to output "12Fizz4Buzz" on number 5', () => {
    const number = 5;

    const result = fizzbuzz.execute(number);

    expect(result).toBe('12Fizz4Buzz');
  });

  it('should be able to output "12Fizz4BuzzFizz78FizzBuzz11Fizz1314FizzBuzz" on number 15', () => {
    const number = 15;

    const result = fizzbuzz.execute(number);

    expect(result).toBe('12Fizz4BuzzFizz78FizzBuzz11Fizz1314FizzBuzz');
  });

  it('should be able to output "12Fizz4BuzzFizz78FizzBuzz11Fizz1314FizzBuzz1617Fizz19BuzzFizz2223FizzBuzz26Fizz2829FizzBuzz" on number 30', () => {
    const number = 30;

    const result = fizzbuzz.execute(number);

    expect(result).toBe(
      '12Fizz4BuzzFizz78FizzBuzz11Fizz1314FizzBuzz1617Fizz19BuzzFizz2223FizzBuzz26Fizz2829FizzBuzz'
    );
  });
});
