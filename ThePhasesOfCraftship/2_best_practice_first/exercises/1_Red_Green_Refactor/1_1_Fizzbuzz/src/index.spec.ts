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

  it('should be able to output "1" on 1 input', () => {
    //given
    const number = 1;

    //when
    const result = fizzbuzz.execute(number);

    //then
    expect(result).toBe('1');
  });
});
