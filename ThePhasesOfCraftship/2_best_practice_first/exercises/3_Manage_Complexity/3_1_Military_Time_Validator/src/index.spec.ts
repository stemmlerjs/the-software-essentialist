import { MilitaryTimeRangeValidator } from './index';

describe('military time range validator', () => {
  it('knows that "00:00 - 23:59" is a valid time range', () => {
    const range = '00:00 - 23:59';

    const result = MilitaryTimeRangeValidator.validate(range);

    expect(result).toBe(true);
  });
});
