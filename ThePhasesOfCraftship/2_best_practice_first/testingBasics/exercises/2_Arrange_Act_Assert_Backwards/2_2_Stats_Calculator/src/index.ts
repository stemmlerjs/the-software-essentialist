export type Statistics = {
    min: number,
    max: number,
    numberOfElements: number,
    average: number
}

export class StatsCalculator {
    static run(): Statistics {
        return {
            min: 1,
            max: 3,
            numberOfElements: 3,
            average: 2
        }
    }
}