import { MilitaryTimeRangeValidator } from './index';

describe('military time range validator', () => {
  describe('range has a "-" separator', () => {
    it.each([
      ['03:03-23:59', true],
      ['00:00 - 23:59', true],
      ['04:52 - 21:39', true],
      ['20:04 - 12:35', true],
      ['00:00 23:59', false],
      ['00:56 21:59', false],
      ['10:50 20:36', false],
      ['10:50 -- 20:36', false],
      ['10:50 - - 20:36', false],
    ])('knows that "%s" is %s', (range, expected) => {
      const result = MilitaryTimeRangeValidator.validate(range);

      expect(result).toBe(expected);
    });
  });

  it.each([
    '03.03 - 23:59',
    '03:03 - 23.59',
    '03:03 - 23,59',
    '05<06 - 07|10',
    '06>19 - 08>08',
  ])('knows that the time "%s" has an invalid timestamp separator', (range) => {
    const result = MilitaryTimeRangeValidator.validate(range);

    expect(result).toBe(false);
  });
});
