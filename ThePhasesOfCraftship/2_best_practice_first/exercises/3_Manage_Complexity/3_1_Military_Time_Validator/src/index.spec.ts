import { MilitaryTimeRangeValidator } from './index';

describe('military time range validator', () => {
  describe('range has 1 "-" separator', () => {
    it.each([
      ['03:03   -   23:59', true],
      ['  03:03-23:59  ', true],
      ['03:03-23:59', true],
      ['00:00 - 23:59', true],
      ['04:52 - 21:39', true],
      ['20:04 - 12:35', true],
      ['00:00 23:59', false],
      ['00:56 21:59', false],
      ['10:50 20:36', false],
      ['10:50 -- 20:36', false],
      ['10:50 - - 20:36', false],
      ['10:50 % 20:36', false],
      ['10:50 $ 20:36', false],
    ])('knows that "%s" is %s', (range, expected) => {
      const result = MilitaryTimeRangeValidator.validate(range);

      expect(result).toBe(expected);
    });
  });

  describe('timestamp has 1 ":" separator', () => {
    it.each([
      ['00:00 - 23:59', true],
      ['03.03 - 23:59', false],
      ['03:03 - 23.59', false],
      ['03:03 - 23,59', false],
      ['05<06 - 07|10', false],
      ['06>19 - 08>08', false],
      ['06::17 - 03::06', false],
      ['06:07:03 - 07:21:23', false],
    ])('knows that "%s" is %s', (range, expected) => {
      const result = MilitaryTimeRangeValidator.validate(range);

      expect(result).toBe(expected);
    });
  });

  describe('each side of a timestamp has 2 digits', () => {
    it.each([
      ['0:00 - 23:59', false],
      ['00:0 - 23:59', false],
      ['000:00 - 23:59', false],
      ['00:000 - 23:59', false],
      ['00:00 - 23:59', true],
      ['00:00 - 00:00', true],
      ['00:00 - 00:0', false],
      ['00:00 - 0:000', false],
      ['00:00 - 0:00', false],
      ['00:00 - 00:0', false],
      ['00:00 - 0:00', false],
    ])('knows that "%s" is %s', (range, expected) => {
      const result = MilitaryTimeRangeValidator.validate(range);

      expect(result).toBe(expected);
    });
  });

  describe('minutes are within range', () => {
    it.each([
      ['00:59 - 00:59', true],
      ['00:00 - 00:59', true],
      ['00:00 - 00:60', false],
      ['00:60 - 00:00', false],
      ['00:64 - 00:00', false],
      ['00:00 - 00:64', false],
      ['00:-0 - 00:00', false],
      ['00:00 - 00:-00', false],
    ])('knows that "%s" is %s', (range, expected) => {
      const result = MilitaryTimeRangeValidator.validate(range);

      expect(result).toBe(expected);
    });
  });

  describe('hours are within range', () => {
    it.each([
      ['23:00 - 00:00', true],
      ['23:59 - 00:59', true],
      ['24:00 - 00:00', false],
      ['25:00 - 00:00', false],
      ['-00:00 - 00:00', false],
      ['00:00 - -05:00', false],
    ])('knows that "%s" is %s', (range, expected) => {
      const result = MilitaryTimeRangeValidator.validate(range);

      expect(result).toBe(expected);
    });
  });
});
