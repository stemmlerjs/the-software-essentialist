export type Statistics = {
    min: number,
    max: number,
    numberOfElements: number,
    average: number
}

export class StatsCalculator {
    static run(numbers: number[]): Statistics {
        if(numbers.includes(Number("NaN"))) {
            throw new Error()
        }

        const min = this.minOf(numbers);
        const max = this.maxOf(numbers);
        const numberOfElements = this.numberOfElementsOf(numbers);
        const average = this.averageOf(numbers);

        return {
            min,
            max,
            numberOfElements,
            average
        }
    }

    private static minOf(numbers: number[]) {
        return numbers.reduce((min, current) => current < min ? current : min);
    }

    private static maxOf(numbers: number[]) {
        return numbers.reduce((max, current) => current > max ? current : max);
    }

    private static numberOfElementsOf(numbers: number[]) {
        return numbers.length;
    }

    private static averageOf(numbers: number[]) {
        return this.sumOf(numbers) / numbers.length;
    }

    private static sumOf(numbers: number[]) {
        return numbers.reduce((total, current) => total + current, 0);
    }
}