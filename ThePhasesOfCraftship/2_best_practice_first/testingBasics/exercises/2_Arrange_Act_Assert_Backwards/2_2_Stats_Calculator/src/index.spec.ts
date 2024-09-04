import { calculateStats } from ".";


describe('stats calculator', () => {

    describe('accepts a sequence of integers', () => {

        it('returns a result if the sequence contains integers only', () => {
            const sequence = [2, 4, 21, -8, 53, 40];
            const result = calculateStats(sequence);
            expect(result).toBeDefined();
        });
    
        test.each([
            [[2, "hello"], "Sequence must contain only integers."],   
            [[2, 3.14], "Sequence must contain only integers."],      
            [[2, NaN], "Sequence must contain only integers."],       
            [[2, undefined], "Sequence must contain only integers."], 
            [[2, null], "Sequence must contain only integers."]       
        ])('throws an error when the sequence contains %p', (invalidSequence, expectedError) => {
            expect(() => calculateStats(invalidSequence as number[])).toThrowError(expectedError);
        });
    });
    
    test.each([
        [[2, 4, 21, -8, 53, 40], { min: -8, max: 53, count: 6, average: 18.666666666667 }],
        [[1, 2, 3, 4, 5], { min: 1, max: 5, count: 5, average: 3 }],
        [[-5, -1, 0, 1, 5], { min: -5, max: 5, count: 5, average: 0 }]
    ])('calculates statistics for %p', (sequence, expectedStats) => {
        const result = calculateStats(sequence);
        expect(result.min).toBe(expectedStats.min);
        expect(result.max).toBe(expectedStats.max);
        expect(result.count).toBe(expectedStats.count);
        expect(result.average).toBe(expectedStats.average);
    });

    it('returns NaN and zero values for an empty sequence', () => {
        const sequence: number[] = [];
        const result = calculateStats(sequence);
        expect(result.min).toBeNaN();
        expect(result.max).toBeNaN();
        expect(result.count).toBe(0);
        expect(result.average).toBeNaN();
    });
   
})