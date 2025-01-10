
describe('password validator', () => {

  it('should know that "abc" is not valid due to length policy', () => {

    const password = 'abc';

    const result = PasswordValidator.check(password);
    
    expect(result).toHaveProperty('result')
    expect(result).toHaveProperty('errors')
    expect(result.result).toBeFalsy()
  })
})


