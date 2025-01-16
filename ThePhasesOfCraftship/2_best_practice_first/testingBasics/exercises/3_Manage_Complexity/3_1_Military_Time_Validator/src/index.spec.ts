import {MilitaryTimeValidator} from "./index";

describe('military time validator', () => {
    it('should know that the time "01:12 - 14:32" is valid', () => {
        const time = "01:12 - 14:32";
        expect(MilitaryTimeValidator.validate(time)).toBeTruthy();
    })
})
