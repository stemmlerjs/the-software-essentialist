import { PasswordValidator } from './index';

describe('password validator', () => {
  it('knows that a password that has between 5 and 15 characters long is valid', () => {
    // Arrange
    const password = 'password';
    const sut = new PasswordValidator();

    // Act
    const result = sut.validatePassword(password);

    // Assert
    expect(result.result).toBeTruthy();
  });
});
