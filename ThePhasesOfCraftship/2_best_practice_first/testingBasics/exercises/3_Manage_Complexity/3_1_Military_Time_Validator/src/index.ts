export type Time = string;
export type Result = true | false;

export class MilitaryTimeValidator {
    static validate(times: Time): Result {
        this.validateType(times);
        this.validateEmptyness(times);
        const [timeFrom, timeTo] = times.split(' - ');
        return (this.validateTime(timeFrom) && this.validateTime(timeTo));
    }

    private static validateEmptyness(times: string) {
        if (times.length === 0) {
            throw new Error("the input time should not be an empty string")
        }
    }

    private static validateType(times: string) {
        if (times === null || times === undefined || typeof times !== "string") {
            throw new Error("the input time should be a string")
        }
    }

    private static validateTime(time: Time): Result {
        const [hours, minutes] = time.split(':');
        return (this.validateHours(hours) && this.validateMinutes(minutes));
    }

    private static validateHours(hours: Time): Result {
        return (Number(hours) >= 0 && Number(hours) <= 23);
    }

    private static validateMinutes(minutes: Time): Result {
        return (Number(minutes) >= 0 && Number(minutes) <= 59);
    }
}