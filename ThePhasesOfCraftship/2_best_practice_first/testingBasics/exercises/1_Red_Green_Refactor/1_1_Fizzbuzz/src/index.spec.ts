describe("fizzBuzz", () => {
	describe("each return value is a string", () => {
		const returnsStringCases = [1, 3, 5, 15];
		test.each(returnsStringCases)("fizzBuzz(%s) a string", (input: number) => {
			expect(typeof fizzBuzz(input)).toBe("string");
		});
	});
});
