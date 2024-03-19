export class MilitaryTimeRangeValidator {
  static validate(range: string): boolean {
    if (range.split('-').length !== 2) return false;
    return true;
  }
}
