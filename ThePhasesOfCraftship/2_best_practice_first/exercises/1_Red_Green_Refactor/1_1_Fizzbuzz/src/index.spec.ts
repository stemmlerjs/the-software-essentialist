describe('fizzbuzz', () => {
  it('should not be able to execute on -5', () => {
    // given
    const number = -5;

    // when / then
    expect(fizzbuzz.execute(number)).toThrow();
  });
});
