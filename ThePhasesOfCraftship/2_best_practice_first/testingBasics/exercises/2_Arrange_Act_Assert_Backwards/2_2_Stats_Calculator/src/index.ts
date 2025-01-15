export type Statistics = {
    min: number,
    max: number,
    numberOfElements: number,
    average: number
}

export class StatsCalculator {
    static run(numbers: number[]): Statistics {
        const min = numbers.reduce((min, current) => current < min ? current : min);
        const max = numbers.reduce((max, current) => current > max ? current : max);
        const numberOfElements = numbers.length;
        const sum = numbers.reduce((total, current) => total + current, 0);
        const average = sum / numberOfElements;
        return {
            min,
            max,
            numberOfElements,
            average
        }
    }
}