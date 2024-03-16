export class FizzBuzz {
  execute(number: number): string {
    if (number < 1) throw new Error();

    if (number === 1) return '1';
    return '';
  }
}
