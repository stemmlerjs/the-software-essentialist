import { StatsCalculator } from './index';

describe('stats calculator', () => {
  it('knows that the numbers [2, 4, 21, -8, 53, 40] have a minimum value of -8', () => {
    const integers = [2, 4, 21, -8, 53, 40];

    const result = StatsCalculator.calculate(integers);

    expect(result.minimum).toBe(-8);
  });
});
