import fizzbuzz from './fizzbuzz'

describe("fizzbuzz", () => {

  test.each([101, -1, 0])("should throw an error when number is outside the range 1 to 100", (n) => {
    expect(() => fizzbuzz(n)).toThrow(RangeError)
  })
  
  test.each([1, 50, 100, 99])("should number is inside the range 1 to 100", (n) => {
    expect(() => fizzbuzz(n)).not.toThrow(RangeError)
  })

  test.each([3,6,9,15])("should return Fizz if number is multiple of 3", (n) => {
    expect(fizzbuzz(n)).toEqual("Fizz")
  })
});
