export class FizzBuzz {
  execute(number: number): string {
    const MIN = 1;
    if (number < MIN) throw new Error();

    let result = '';

    for (let i = MIN; i <= number; i++) {
      if (this.isMultipleOf3(i)) {
        result += 'Fizz';
        continue;
      }

      if (this.isMultipleOf5(i)) {
        result += 'Buzz';
        continue;
      }

      result += i;
    }

    return result;
  }

  private isMultipleOf3(number: number) {
    return number % 3 === 0;
  }

  private isMultipleOf5(number: number) {
    return number % 5 === 0;
  }
}
