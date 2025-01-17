import {BooleanCalculator} from "./index";

describe('boolean calculator', () => {
    describe('single values', () => {
        it('should know that the result for "TRUE" is true',  () => {
            const expression = 'TRUE';
            expect(BooleanCalculator.run(expression)).toBeTruthy();
        });

        it('should know that the result for "FALSE" is false',  () => {
            const expression = 'FALSE';
            expect(BooleanCalculator.run(expression)).toBeFalsy();
        });
    })
})
