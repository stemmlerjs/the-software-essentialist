
export class DateUtil {
  static createFromRelativeDaysAgo(daysAgo: number): string {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toString();
  }
}
