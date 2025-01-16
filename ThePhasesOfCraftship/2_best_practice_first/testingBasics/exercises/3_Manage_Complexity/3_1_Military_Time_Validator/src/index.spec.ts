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
})
