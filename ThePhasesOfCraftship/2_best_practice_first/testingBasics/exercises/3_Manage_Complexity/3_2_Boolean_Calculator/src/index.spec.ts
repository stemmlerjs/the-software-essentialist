import { BooleanCalculator } from "./BooleanCalculator";

describe('boolean calculator', () => {

    describe('Evaluateing simple values', () => {
        it.each([
            { input: 'TRUE', expected: true },
            { input: 'FALSE', expected: false },
        ])('Should evaluate "$input" as $expected', ({ input, expected }) => {
            // act
            const result = BooleanCalculator.Evaluate(input);
    
            // assert
            expect(result).toBe(expected);
        })
    })

    describe('Evaluating NOT', () => {
        it.each([
            { input: 'NOT TRUE', expected: false },
            { input: 'NOT FALSE', expected: true },
        ])('Should evaluate "$input" as $expected', ({ input, expected }) => {
            // act
            const result = BooleanCalculator.Evaluate(input);
    
            // assert
            expect(result).toBe(expected);
        })
    })

    
    describe('Evaluating AND', () => {
        it.each([
            { input: 'TRUE AND TRUE', expected: true },
            { input: 'TRUE AND FALSE', expected: false },
            { input: 'FALSE AND TRUE', expected: false },
            { input: 'FALSE AND FALSE', expected: false },
        ])('Should evaluate "$input" as $expected', ({ input, expected }) => {
            // act
            const result = BooleanCalculator.Evaluate(input);
    
            // assert
            expect(result).toBe(expected);
        })
    })

    
    describe('Evaluating OR', () => {
        it.each([
            { input: 'TRUE OR TRUE', expected: true },
            { input: 'TRUE OR FALSE', expected: true },
            { input: 'FALSE OR TRUE', expected: true },
            { input: 'FALSE OR FALSE', expected: false },
        ])('Should evaluate "$input" as $expected', ({ input, expected }) => {
            // act
            const result = BooleanCalculator.Evaluate(input);
    
            // assert
            expect(result).toBe(expected);
        })
    })

    describe('Handling invalid expressions', () => {
        it.each([
            { input: '', expected: 'Invalid boolean expression.' },
            { input: 'NOT', expected: 'Invalid boolean expression.' },
        ])('Should throw an error for "$input"', ({ input, expected }) => {
            // act & assert
            expect(() => BooleanCalculator.Evaluate(input)).toThrow(expected);
        })
    })
})
