import { FizzBuzz } from './fizzbuzz';

describe('fizzbuzz', () => {
  let fizzbuzz: FizzBuzz;

  beforeEach(() => {
    fizzbuzz = new FizzBuzz();
  });

  it('should not be able to execute on -5', () => {
    // given
    const number = -5;

    // when / then
    expect(() => fizzbuzz.execute(number)).toThrow();
  });

  it('should not be able to execute on 0', () => {
    //given
    const number = 0;

    // when / then
    expect(() => fizzbuzz.execute(number)).toThrow();
  });

  it('should be able to output "1" on number 1', () => {
    //given
    const number = 1;

    //when
    const result = fizzbuzz.execute(number);

    //then
    expect(result).toBe('1');
  });

  it('should be able to output "12" on number 2', () => {
    //given
    const number = 2;

    //when
    const result = fizzbuzz.execute(number);

    //then
    expect(result).toBe('12');
  });

  it('should be able to output "12Fizz" on number 3', () => {
    //given
    const number = 3;

    //when
    const result = fizzbuzz.execute(number);

    //then
    expect(result).toBe('12Fizz');
  });

  it('should be able to output "12Fizz4Buzz" on number 5', () => {
    //given
    const number = 5;

    //when
    const result = fizzbuzz.execute(number);

    //then
    expect(result).toBe('12Fizz4Buzz');
  });
});
