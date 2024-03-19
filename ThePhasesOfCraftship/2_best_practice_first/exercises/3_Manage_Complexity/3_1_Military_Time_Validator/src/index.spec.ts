import { MilitaryTimeRangeValidator } from './index';

describe('military time range validator', () => {
  it('knows that "00:00 - 23:59" is a valid time range', () => {
    const range = '00:00 - 23:59';

    const result = MilitaryTimeRangeValidator.validate(range);

    expect(result).toBe(true);
  });

  it.each([
    '00:00 23:59',
    '00:56 21:59',
    '10:50 20:36',
    '10:50 -- 20:36',
    '10:50 - - 20:36',
  ])('knows that "00:00 23:59" is an invalid time range', (range) => {
    const result = MilitaryTimeRangeValidator.validate(range);

    expect(result).toBe(false);
  });
});
