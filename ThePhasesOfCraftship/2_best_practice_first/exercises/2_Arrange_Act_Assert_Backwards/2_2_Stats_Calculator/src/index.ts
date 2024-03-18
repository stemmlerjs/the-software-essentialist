export class StatsCalculator {
  static calculate(numbers: number[]) {
    let minimum = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] < minimum) minimum = numbers[i];
    }

    return {
      minimum,
    };
  }
}
