export const fizzbuzz = (n: number): string => {
    if (typeof n !== "number") throw new Error("input should be a number")
    if (n <= 0) throw new Error("number should be greater than zero")
    if (n > 100) throw new Error("number should be lower or equal to 100")
    if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz"
    if (n % 3 === 0) return "Fizz"
    if (n % 5 === 0) return "Buzz"
    return n.toString()
}