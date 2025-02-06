import { fizzBuzz } from "./fizzbuzz";

describe("fizzBuzz", () => {
	describe("Each return value is a string", () => {
		const returnsStringCases = [1, 3, 5, 15];
		test.each(returnsStringCases)("fizzBuzz(%s) returns a string", (input: number) => {
			expect(typeof fizzBuzz(input)).toBe("string");
		});
	});
	describe("When the input is divisible by 3", () => {
		describe("it returns 'Fizz'", () => {
			const divisibleBy3Cases = [3, 9, 42];
			test.each(divisibleBy3Cases)("fizzBuzz(%s) returns 'Fizz'", (input: number) => {
				expect(fizzBuzz(input)).toBe("Fizz");
			});
		});
	});
	describe("When the input is divisible by 5", () => {
		describe("it returns 'Buzz'", () => {
			const divisibleBy5Cases = [5, 25, 80];
			test.each(divisibleBy5Cases)("fizzBuzz(%s) returns 'Buzz'", (input: number) => {
				expect(fizzBuzz(input)).toBe("Buzz");
			});
		});
	});
	describe("When the input is divisible by 3 and 5", () => {
		describe("it returns 'FizzBuzz'", () => {
			const divisibleBy3And5Cases = [15, 45];
			test.each(divisibleBy3And5Cases)("fizzBuzz(%s) returns 'FizzBuzz'", (input: number) => {
				expect(fizzBuzz(input)).toBe("FizzBuzz");
			});
		});
	});
	test("43 returns '43'", () => {
		expect(fizzBuzz(43)).toBe("43");
	});
});
