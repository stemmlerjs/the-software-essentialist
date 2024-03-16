export class FizzBuzz {
  execute(number: number): string {
    if (number < 1) throw new Error();

    let result = '';

    for (let i = 1; i <= number; i++) {
      if (i % 3 === 0) {
        result += 'Fizz';
        continue;
      }

      result += i;
    }

    return result;
  }
}
