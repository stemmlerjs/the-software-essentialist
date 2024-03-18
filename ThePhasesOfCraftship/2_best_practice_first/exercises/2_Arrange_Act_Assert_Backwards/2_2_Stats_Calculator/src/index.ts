export class StatsCalculator {
  static calculate(numbers: (number | bigint)[]) {
    if (
      numbers.some(
        (number) => typeof number !== 'bigint' && !Number.isInteger(number)
      )
    )
      throw new Error('All numbers must be integers');

    let minimum = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] < minimum) minimum = numbers[i];
    }

    return {
      minimum,
    };
  }
}
