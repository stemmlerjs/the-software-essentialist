export class MilitaryTimeRangeValidator {
  static validate(range: string): boolean {
    const timestamps = range.split('-');
    if (timestamps.length !== 2) return false;

    if (timestamps[0].includes('.')) return false;
    if (timestamps[1].includes('.')) return false;
    if (timestamps[1].includes(',')) return false;

    return true;
  }
}
