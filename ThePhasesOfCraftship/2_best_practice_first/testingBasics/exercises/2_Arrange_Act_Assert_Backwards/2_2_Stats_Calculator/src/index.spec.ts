/*

RESPONSIBILITIES

- take a secuence of integers
- calculate minimum value
- calculate maximum value
- calculate number of elements
- calculate average value
- return statistics in result

COLLABORATORS

StatsCalculator
- validate sequence (integers only)
    - throw error otherwise
- calculate statistics
- construct and return Result

Result
- store statistics

*/

import { calculateStats } from ".";


describe('stats calculator', () => {

    it.skip('calculates stats', ()=>{
        // arrange
        const sequence = [2, 4, 21, -8, 53, 40];

        // act

        const result = {
            min: -8,
            max: 53,
            count: 6,
            average: 18.666666666667
        }

        // assert
        expect(result.min).toBe(-8);
        expect(result.max).toBe(53);
        expect(result.count).toBe(6);
        expect(result.average).toBe(18.666666666667);
    })

    describe('accepts a sequence of integers', () => {

        it('returns a result if the sequence contains integers only', () => {
            const sequence = [2, 4, 21, -8, 53, 40];
            const result = calculateStats(sequence);
            expect(result).toBeDefined();
        });
    
        it('throws an error when the sequence contains non-integer values', () => {
            const invalidSequence = [2, 4, 21, "hello", -8, 53.5] as number[];
            expect(() => calculateStats(invalidSequence)).toThrowError("Sequence must contain only integers.");
        });
    });
    
    test.each([
        [[2, 4, 21, -8, 53, 40], { min: -8, max: 53, count: 6, average: 18.666666666666668 }],
        [[1, 2, 3, 4, 5], { min: 1, max: 5, count: 5, average: 3 }],
        [[-5, -1, 0, 1, 5], { min: -5, max: 5, count: 5, average: 0 }]
    ])('calculates statistics for %p', (sequence, expectedStats) => {
        const result = calculateStats(sequence);
        expect(result.min).toBe(expectedStats.min);
        expect(result.max).toBe(expectedStats.max);
        expect(result.count).toBe(expectedStats.count);
        expect(result.average).toBe(expectedStats.average);
    });
   
})