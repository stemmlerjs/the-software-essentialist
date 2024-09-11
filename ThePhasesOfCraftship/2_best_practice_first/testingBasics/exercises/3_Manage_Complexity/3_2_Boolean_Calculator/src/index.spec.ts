import { BooleanCalculator } from "./BooleanCalculator";

describe('boolean calculator', () => {

    describe('Evaluate simple values', () => {
        it.each([
            { input: 'TRUE', expected: true },
            { input: 'FALSE', expected: false },
        ])('Should evaluate "$input" as $expected', ({ input, expected }) => {
            // arrange
            const booleanStr = input;
    
            // act
            const result = BooleanCalculator.Evaluate(booleanStr);
    
            // assert
            expect(result).toBe(expected);
        })
    })
})
