import { fizzbuzz } from './fizzbuzz';

describe('fizzbuzz', () => {
  it('throws an error when the input is not a number', () => {
    expect(() => fizzbuzz('a' as unknown as number)).toThrowError(
      'Input must be a number'
    );
  });

  // Cool, I didn't know you could use tagged template literals with it.each
  it.each`
    input | expected
    ${3}  | ${'Fizz'}
    ${5}  | ${'Buzz'}
    ${15} | ${'FizzBuzz'}
    ${9}  | ${'Fizz'}
    ${43} | ${'43'}
    ${42} | ${'Fizz'}
    ${45} | ${'FizzBuzz'}
  `('returns $expected when the input is $input', ({ input, expected }) => {
    expect(fizzbuzz(input)).toBe(expected);
  });

  it.each`
    input
    ${102}
    ${-12}
  `('throws an error when the input is $input', ({ input }) => {
    expect(() => fizzbuzz(input)).toThrowError(
      'Number must be between 1 and 100'
    );
  });
});
