export class FizzBuzz {
  execute(number: number): string {
    const MIN = 1;
    const MAX = 100;
    if (number < MIN || number > MAX) throw new Error();

    let result = '';

    for (let i = MIN; i <= number; i++) {
      if (this.isMultipleOf3(i) && this.isMultipleOf5(i)) {
        result += 'FizzBuzz';
      } else if (this.isMultipleOf3(i)) {
        result += 'Fizz';
      } else if (this.isMultipleOf5(i)) {
        result += 'Buzz';
      } else {
        result += i;
      }
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
