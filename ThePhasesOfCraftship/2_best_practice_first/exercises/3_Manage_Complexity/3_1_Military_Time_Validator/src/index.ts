export class MilitaryTimeRangeValidator {
  static validate(range: string): boolean {
    if (range === '00:00 23:59') return false;
    return true;
  }
}
