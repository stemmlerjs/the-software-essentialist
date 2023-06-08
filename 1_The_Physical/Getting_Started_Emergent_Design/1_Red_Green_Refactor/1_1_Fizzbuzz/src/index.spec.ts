import { fizzbuzz } from "./fizzbuzz"

describe("fizzbuzz", () => {
    it("returns a string", () => {
        const result = fizzbuzz(4);
        expect(typeof result).toBe("string");
    });

    it("returns 1 as a string", () => {
        const result = fizzbuzz(1);
        expect(result).toEqual("1");
    })
});
