import { BooleanCalculator } from "./BooleanCalculator";

describe('boolean calculator', () => {

    describe('Evaluateing simple values', () => {
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

    describe('Evaluating NOT', () => {
        it.each([
            { input: 'NOT TRUE', expected: false },
            { input: 'NOT FALSE', expected: true },
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
