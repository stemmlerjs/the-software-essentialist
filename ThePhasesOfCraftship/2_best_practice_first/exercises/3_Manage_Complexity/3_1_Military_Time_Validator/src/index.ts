export class MilitaryTimeRangeValidator {
  static validate(range: string): boolean {
    const timestamps = getTimestamps(range);
    if (timestamps.length !== 2) return false;

    for (const timestamp of timestamps) {
      const sides = getSides(timestamp) as [string, string];
      if (sides.length !== 2) return false;

      if (!sides.every(has2Digits)) return false;

      const { hours, minutes } = getHoursAndMinutes(sides);

      const MAX_HOURS = 23;
      const MAX_MINUTES = 59;

      if (hours > MAX_HOURS) return false;
      if (minutes > MAX_MINUTES) return false;
    }

    return true;
  }
}

function getTimestamps(range: string): string[] {
  return range.split('-').map((timestamp) => timestamp.trim());
}

function getSides(timestamp: string): string[] {
  return timestamp.split(':').map((side) => side.trim());
}

function has2Digits(str: string) {
  return /^\d{2}$/.test(str);
}

function getHoursAndMinutes(sides: [string, string]) {
  const [hours, minutes] = sides.map((side) => parseInt(side)) as [
    number,
    number
  ];

  return { hours, minutes };
}
