import { StatsCalculator } from './index';

describe('stats calculator', () => {
  describe('minimum value', () => {
    test.each([
      [[2, 4, 21, -8, 53, 40], -8],
      [[0, 1, 2], 0],
      [[5], 5],
    ])('knows that %s is expected to be %i', (integers, minimum) => {
      const result = StatsCalculator.calculate(integers);

      expect(result.minimum).toBe(minimum);
    });
  });

  it('knows that the numbers [1.5, 2.9, 3.456] are not integers', () => {
    const numbers = [1.5, 2.9, 3.456];

    expect(() => StatsCalculator.calculate(numbers)).toThrowError();
  });

  it('knows that the numbers [1, NaN] are not integers', () => {
    const numbers = [NaN, 1];

    expect(() => StatsCalculator.calculate(numbers)).toThrowError();
  });
});
