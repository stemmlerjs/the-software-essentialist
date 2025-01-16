import {MilitaryTimeValidator, Time} from "./index";

describe('military time validator', () => {
    it('should know that the time "01:12 - 14:32" is valid', () => {
        const time: Time = "01:12 - 14:32";
        expect(MilitaryTimeValidator.validate(time)).toBeTruthy();
    })

    it('should know that the time "25:00 - 12:23" is not valid', () => {
        const time: Time = "25:00 - 12:23";
        expect(MilitaryTimeValidator.validate(time)).toBeFalsy();
    })

    it('should know that the time "13:72 - 14:15" is not valid', () => {
        const time: Time = "13:72 - 14:15";
        expect(MilitaryTimeValidator.validate(time)).toBeFalsy();
    })

    it('should throw an error when giving a non string', () => {
        expect(() => MilitaryTimeValidator.validate(undefined as any)).toThrow("the input time should be a string");
        expect(() => MilitaryTimeValidator.validate(null as any)).toThrow("the input time should be a string");
        expect(() => MilitaryTimeValidator.validate(true as any)).toThrow("the input time should be a string");
        expect(() => MilitaryTimeValidator.validate({} as any)).toThrow("the input time should be a string");
        expect(() => MilitaryTimeValidator.validate([] as any)).toThrow("the input time should be a string");
    })

    it('should throw an error when giving an empty string', () => {
        expect(() => MilitaryTimeValidator.validate('')).toThrow("the input time should not be an empty string");
    })
})
