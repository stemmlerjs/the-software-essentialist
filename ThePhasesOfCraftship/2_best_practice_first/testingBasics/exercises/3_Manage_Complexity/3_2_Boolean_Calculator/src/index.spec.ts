import {BooleanCalculator} from "./index";

describe('boolean calculator', () => {
    describe('single values', () => {
        it('should know that the result for "TRUE" is true',  () => {
            const expression = 'TRUE';
            expect(BooleanCalculator.run(expression)).toBeTruthy();
        })
    })
})
