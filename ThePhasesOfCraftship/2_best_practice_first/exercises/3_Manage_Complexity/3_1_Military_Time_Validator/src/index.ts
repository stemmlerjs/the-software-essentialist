export class MilitaryTimeRangeValidator {
  static validate(range: string): boolean {
    if (!range.includes('-')) return false;
    return true;
  }
}
