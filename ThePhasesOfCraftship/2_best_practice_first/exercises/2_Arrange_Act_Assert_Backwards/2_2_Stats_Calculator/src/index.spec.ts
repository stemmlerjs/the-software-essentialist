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

  describe('maximum value', () => {
    test.each([
      [[2, 4, 21, -8, 53, 40], 53],
      [[0, 1, 2], 2],
      [[5], 5],
    ])('knows that %s is expected to be %i', (integers, maximum) => {
      const result = StatsCalculator.calculate(integers);

      expect(result.maximum).toBe(maximum);
    });
  });

  describe('all numbers are integers', () => {
    test.each([
      [[99999999999999999], true],
      [[1, 2, 3], true],
      [[0], true],
      [[1.5, 2.9, 3.456], false],
      [[1, NaN], false],
      [[Infinity, 1], false],
      [[-Infinity, Infinity], false],
      [[BigInt(99999999999999999)], true],
    ])('knows that %s being valid is %s', (numbers, areIntegers) => {
      areIntegers
        ? expect(() => StatsCalculator.calculate(numbers)).not.toThrowError()
        : expect(() => StatsCalculator.calculate(numbers)).toThrowError();
    });
  });
});
