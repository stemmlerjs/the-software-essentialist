import {MilitaryTimeValidator, Time} from "./index";

describe('military time validator', () => {
    const is = "is";
    const isNot = 'is not';

    const cases: [string, string, boolean][] = [
        ["01:12 - 14:32", is, true],
        ["25:00 - 12:23", isNot, false],
        ["13:72 - 14:15", isNot, false],
        ["01.12 - 14.32", isNot, false]
    ]
    it.each(cases)('should know that the time %s %s valid', (time: Time, str: string, expected: boolean) => {
        expect(MilitaryTimeValidator.validate(time)).toBe(expected)
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
