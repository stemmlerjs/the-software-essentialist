export type Statistics = {
    min: number,
    max: number,
    numberOfElements: number,
    average: number
}

export class StatsCalculator {
    static run(): StatsCalculator {
        return {
            min: 1,
            max: 3
        }
    }
}