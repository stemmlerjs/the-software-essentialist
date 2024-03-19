export class MilitaryTimeRangeValidator {
  static validate(range: string): boolean {
    const timestamps = range.split('-');
    if (timestamps.length !== 2) return false;

    for (const timestamp of timestamps) {
      const sides = timestamp.trim().split(':');
      if (sides.length !== 2) return false;

      for (const side of sides) {
        if (!/^\d{2}$/.test(side)) return false;
      }

      const hours = parseInt(sides[0]);
      const minutes = parseInt(sides[1]);

      if (hours > 23) return false;
      if (minutes > 59) return false;
    }

    return true;
  }
}
