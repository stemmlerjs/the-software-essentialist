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

    describe('NOT operator', () => {
        it('should know that the result for "NOT FALSE" is true', () => {
            const expression = 'NOT FALSE';
            expect(BooleanCalculator.run(expression)).toBeTruthy();
        });

        it('should know that the result for "NOT TRUE" is false', () => {
            const expression = 'NOT TRUE';
            expect(BooleanCalculator.run(expression)).toBeFalsy();
        });
    })

    describe('AND operator', () => {
        it('should know that the result for "TRUE AND TRUE" is true', () => {
            const expression = 'TRUE AND TRUE';
            expect(BooleanCalculator.run(expression)).toBeTruthy();
        });

        it('should know that the result for "TRUE AND FALSE" is false', () => {
            const expression = 'TRUE AND FALSE';
            expect(BooleanCalculator.run(expression)).toBeFalsy();
        });
    })

    describe('OR operator', () => {
        it('should know that the result for "TRUE OR FALSE" is true', () => {
            const expression = 'TRUE OR FALSE';
            expect(BooleanCalculator.run(expression)).toBeTruthy();
        });
    })
})
