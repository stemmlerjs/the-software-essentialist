import { fizzBuzz } from "./fizzbuzz";

describe("fizzBuzz", () => {
	describe("each return value is a string", () => {
		const returnsStringCases = [1, 3, 5, 15];
		test.each(returnsStringCases)("fizzBuzz(%s) returns a string", (input: number) => {
			expect(typeof fizzBuzz(input)).toBe("string");
		});
	});
	test("3 returns 'Fizz'", () => {
		expect(fizzBuzz(3)).toBe("Fizz");
	});
	test("9 returns 'Fizz'", () => {
		expect(fizzBuzz(9)).toBe("Fizz");
	});
	test("5 returns 'Buzz'", () => {
		expect(fizzBuzz(5)).toBe("Buzz");
	});
	test("43 returns '43'", () => {
		expect(fizzBuzz(43)).toBe("43");
	});
});
