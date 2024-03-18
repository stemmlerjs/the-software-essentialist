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

  it('knows that a password that is outside 5 and 15 characters long is invalid', () => {
    // Arrange
    const password = 'mom';
    const sut = new PasswordValidator();

    // Act
    const result = sut.validatePassword(password);

    // Assert
    expect(result.result).toBeFalsy();
    expect(result.errors).toBeDefined();
    expect(result.errors!.length).toBe(1);
    expect(result.errors![0].type).toBe('IncorrectPasswordLength');
    expect(result.errors![0].message).toContain('5 and 15');
  });
});
