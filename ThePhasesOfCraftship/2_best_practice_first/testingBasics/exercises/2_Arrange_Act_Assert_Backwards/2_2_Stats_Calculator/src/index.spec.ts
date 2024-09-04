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

})