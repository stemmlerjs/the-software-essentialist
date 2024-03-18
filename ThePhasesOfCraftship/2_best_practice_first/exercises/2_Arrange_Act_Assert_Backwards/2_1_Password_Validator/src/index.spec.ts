import { PasswordValidator } from './index';

describe('password validator', () => {
  let sut: PasswordValidator;

  beforeEach(() => {
    sut = new PasswordValidator();
  });

  it('knows that a password that has between 5 and 15 characters long is valid', () => {
    // Arrange
    const password = 'password1';

    // Act
    const result = sut.validatePassword(password);

    // Assert
    expect(result.result).toBeTruthy();
    expect(result.errors).not.toBeDefined();
  });

  it('knows that a password that is outside 5 and 15 characters long is invalid', () => {
    // Arrange
    const password = 'mom1';

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

    // Act
    const result = sut.validatePassword(password);

    // Assert
    expect(result.result).toBeTruthy();
    expect(result.errors).not.toBeDefined();
  });

  it('knows that a password without at least one digit is invalid', () => {
    // Arrange
    const password = 'password';

    // Act
    const { result, errors } = sut.validatePassword(password);

    // Assert
    expect(result).toBeFalsy();
    expect(errors!).toBeDefined();
    expect(errors!.length).toBe(1);
    expect(errors![0].type).toBe('PasswordMustHaveAtLeastOneDigit');
    expect(errors![0].message).toContain('at least 1 digit');
  });

  it('knows that a password with at least one upper case letter is valid', () => {
    // Arrange
    const password = 'Password1';

    // Act
    const result = sut.validatePassword(password);

    // Assert
    expect(result.result).toBeTruthy();
    expect(result.errors).not.toBeDefined();
  });
});
