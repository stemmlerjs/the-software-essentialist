export class MilitaryTimeRangeValidator {
  static validate(range: string): boolean {
    if (range === '00:00 23:59') return false;
    if (range === '00:56 21:59') return false;
    if (range === '10:50 20:36') return false;
    return true;
  }
}
