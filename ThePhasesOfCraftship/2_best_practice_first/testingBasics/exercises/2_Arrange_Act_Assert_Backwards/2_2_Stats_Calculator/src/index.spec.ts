import {StatsCalculator} from "./index";

describe('stats calculator', () => {
    it('should know that for the numbers 1, 2 and 3, the minimum is 1', () => {
        expect(StatsCalculator.run()).toHaveProperty('min')
        expect(StatsCalculator.run().min).toBe(1)
    })

    it('should know that for the numbers 1, 2 and 3, the maximum is 3', () => {
        expect(StatsCalculator.run()).toHaveProperty('max')
        expect(StatsCalculator.run().max).toBe(3)
    })

    it('should know that for the numbers 1, 2 and 3, the number of elements is 3', () => {
        expect(StatsCalculator.run()).toHaveProperty('numberOfElements')
        expect(StatsCalculator.run().numberOfElements).toBe(3)
    })
})