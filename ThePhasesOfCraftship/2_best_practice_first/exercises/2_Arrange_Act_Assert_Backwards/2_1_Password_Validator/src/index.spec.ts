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
    const { result, errors } = sut.validatePassword(password);

    // Assert
    expect(result).toBeFalsy();
    expect(errors).toBeDefined();
    expect(errors!.length).toBe(1);
    expect(errors![0].type).toBe('IncorrectPasswordLength');
    expect(errors![0].message).toContain('5 and 15');
  });

  it('knows that a password with at least one digit is valid', () => {
    // Arrange
    const password = 'password1';
    const sut = new PasswordValidator();

    // Act
    const result = sut.validatePassword(password);

    // Assert
    expect(result.result).toBeTruthy();
  });
});
