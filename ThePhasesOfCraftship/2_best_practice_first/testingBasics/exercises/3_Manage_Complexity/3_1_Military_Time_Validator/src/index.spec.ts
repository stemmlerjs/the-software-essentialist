import {MilitaryTimeValidator} from "./index";

describe('military time validator', () => {
    it('should know that the time "01:12 - 14:32" is valid', () => {
        const time = "01:12 - 14:32";
        expect(MilitaryTimeValidator.validate(time)).toBeTruthy();
    })

    it('should know that the time "25:00 - 12:23" is not valid', () => {
        const time = "25:00 - 12:23";
        expect(MilitaryTimeValidator.validate(time)).toBeFalsy();
    })
})
