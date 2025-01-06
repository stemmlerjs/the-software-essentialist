export const fizzbuzz = (n: number): string => {
    if (n === 0) throw new Error()
    if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz"
    if (n % 3 === 0) return "Fizz"
    if (n % 5 === 0) return "Buzz"
    return n.toString()
}