export type Statistics = {
    min: number,
    max: number,
    numberOfElements: number,
    average: number
}

export class StatsCalculator {
    static run(numbers: number[]): Statistics {
        const min = this.getMin(numbers);
        const max = this.getMax(numbers);
        const numberOfElements = numbers.length;
        const sum = this.getSum(numbers);
        const average = sum / numberOfElements;

        return {
            min,
            max,
            numberOfElements,
            average
        }
    }

    private static getMin(numbers: number[]) {
        return numbers.reduce((min, current) => current < min ? current : min);
    }

    private static getMax(numbers: number[]) {
        return numbers.reduce((max, current) => current > max ? current : max);
    }

    private static getSum(numbers: number[]) {
        return numbers.reduce((total, current) => total + current, 0);
    }
}