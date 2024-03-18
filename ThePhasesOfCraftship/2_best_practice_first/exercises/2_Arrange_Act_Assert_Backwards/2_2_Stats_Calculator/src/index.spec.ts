import { StatsCalculator } from './index';

describe('stats calculator', () => {
  describe('statistics', () => {
    test.each([
      [
        [2, 4, 21, -8, 53, 40],
        { minimum: -8, maximum: 53, count: 6, average: 18.666666666667 },
      ],
      [[0, 1, 2], { minimum: 0, maximum: 2, count: 3, average: 1 }],
      [[5], { minimum: 5, maximum: 5, count: 1, average: 5 }],
    ])('knows that %s returns \n%o', (integers, stats) => {
      const result = StatsCalculator.calculate(integers);

      const expectedFractionDigits = stats.average
        .toString()
        .split('.')[1]?.length;

      expect({
        ...result,
        average: parseFloat(result.average.toFixed(expectedFractionDigits)),
      }).toEqual({
        ...stats,
        average: parseFloat(stats.average.toFixed(expectedFractionDigits)),
      });
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
