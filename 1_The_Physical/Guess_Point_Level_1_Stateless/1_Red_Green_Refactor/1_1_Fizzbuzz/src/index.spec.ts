import fizzbuzz from './fizzbuzz'

describe("fizzbuzz", () => {

  test.each([101, -1, 0])("should throw an error when number is outside the range 1 to 100", (n) => {
    expect(fizzbuzz(n)).toThrow(RangeError)
  })

});
