export class MilitaryTimeRangeValidator {
  static validate(range: string): boolean {
    const timestamps = range.split('-');
    if (timestamps.length !== 2) return false;

    for (const timestamp of timestamps) {
      if (!timestamp.includes(':')) return false;
    }

    return true;
  }
}
