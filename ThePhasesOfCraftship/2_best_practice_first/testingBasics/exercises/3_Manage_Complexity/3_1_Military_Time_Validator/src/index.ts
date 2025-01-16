export class MilitaryTimeValidator {
    static validate(times: string): boolean {
        const [timeFrom, timeTo] = times.split(' - ');
        return (this.validateTime(timeFrom) && this.validateTime(timeTo));
    }

    private static validateTime(time: string): boolean {
        const [hours, minutes] = time.split(':');
        return (this.validateHours(hours) && this.validateMinutes(minutes));
    }

    private static validateHours(hours: string): boolean {
        return (Number(hours) >= 0 && Number(hours) <= 23);
    }

    private static validateMinutes(minutes: string): boolean {
        return (Number(minutes) >= 0 && Number(minutes) <= 59);
    }
}