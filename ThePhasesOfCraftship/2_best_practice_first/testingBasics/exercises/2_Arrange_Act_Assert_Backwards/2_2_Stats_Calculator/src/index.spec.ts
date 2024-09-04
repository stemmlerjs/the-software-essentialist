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
            // arrange
            const sequence = [2, 4, 21, -8, 53, 40];
            
            // act
            const result = calculateStats(sequence);
            
            // assert
            expect(result).toBeDefined();
        });
    
        it('throws an error when the sequence contains non-integer values', () => {
            // arrange
            const invalidSequence = [2, 4, 21, "hello", -8, 53.5] as number[];
        
            // act & assert
            expect(() => calculateStats(invalidSequence)).toThrowError("Sequence must contain only integers.");
        });
    })

    it('calculates the minimum value', () => {
        // arrange
        const sequence = [2, 4, 21, -8, 53, 40];
    
        // act
        const result = calculateStats(sequence);
    
        // assert
        expect(result.min).toBe(-8);
    });

    it('calculates the maximum value', () => {
        // arrange
        const sequence = [2, 4, 21, -8, 53, 40];
    
        // act
        const result = calculateStats(sequence);
    
        // assert
        expect(result.max).toBe(53);
    });

    it('calculates the number of elements in the sequence', () => {
        // arrange
        const sequence = [2, 4, 21, -8, 53, 40];
    
        // act
        const result = calculateStats(sequence);
    
        // assert
        expect(result.count).toBe(6);
    });
   
})