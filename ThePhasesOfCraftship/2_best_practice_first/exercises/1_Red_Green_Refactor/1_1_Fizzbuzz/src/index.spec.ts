import { FizzBuzz } from './fizzbuzz';

describe('fizzbuzz', () => {
  it('should not be able to execute on -5', () => {
    // given
    const fizzbuzz = new FizzBuzz();
    const number = -5;

    // when / then
    expect(() => fizzbuzz.execute(number)).toThrow();
  });

  it('should not be able to execute on 0', () => {
    //given
    const fizzbuzz = new FizzBuzz();
    const number = 0;

    // when / then
    expect(() => fizzbuzz.execute(number)).toThrow();
  });

  it('should be able to output "1" on 1 input', () => {
    //given
    const fizzbuzz = new FizzBuzz();
    const number = 1;

    //when
    const result = fizzbuzz.execute(number);

    //then
    expect(result).toBe('1');
  });
});
