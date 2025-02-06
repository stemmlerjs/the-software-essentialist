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
});
