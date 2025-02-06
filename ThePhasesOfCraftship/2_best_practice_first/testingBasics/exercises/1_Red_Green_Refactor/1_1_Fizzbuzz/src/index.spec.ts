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
	test("5 returns 'Buzz'", () => {
		expect(fizzBuzz(5)).toBe("Buzz");
	});
	test("43 returns '43'", () => {
		expect(fizzBuzz(43)).toBe("43");
	});
});
