import { PasswordValidator } from './index';

describe('password validator', () => {
  let sut: PasswordValidator;

  beforeEach(() => {
    sut = new PasswordValidator();
  });

  describe('password length must be between 5 and 15 characters long', () => {
    it.each(['password', 'qwerty', '123456'])(
      'knows that "%s" has valid length',
      (password) => {
        const result = sut.validatePassword(password);

        expect(
          result.errors?.find((err) => err.type === 'IncorrectPasswordLength')
        ).not.toBeDefined();
      }
    );

    it.each(['mom', 'test', 'pt'])(
      'knows that "%s" has invalid length',
      (password) => {
        const { result, errors } = sut.validatePassword(password);

        expect(result).toBeFalsy();
        expect(errors).toBeDefined();

        expect(
          errors?.find((err) => err.type === 'IncorrectPasswordLength')
        ).toBeDefined();

        expect(
          errors?.find((err) => err.type === 'IncorrectPasswordLength')?.message
        ).toContain('5 and 15');
      }
    );
  });

  describe('password must have at least one digit', () => {
    it.each(['digit1', '1', '123'])(
      'knows that "%s" has at least one digit',
      (password) => {
        const result = sut.validatePassword(password);

        expect(
          result.errors?.find(
            (err) => err.type === 'PasswordMustHaveAtLeastOneDigit'
          )
        ).not.toBeDefined();
      }
    );

    it.each(['password', 'HasNoDigits', 'HasZeroDigits'])(
      'knows that "%s" doesn\'t have at least one digit',
      (password) => {
        const { result, errors } = sut.validatePassword(password);

        expect(result).toBeFalsy();
        expect(errors).toBeDefined();

        expect(
          errors?.find((err) => err.type === 'PasswordMustHaveAtLeastOneDigit')
        ).toBeDefined();

        expect(
          errors?.find((err) => err.type === 'PasswordMustHaveAtLeastOneDigit')
            ?.message
        ).toContain('at least 1 digit');
      }
    );
  });

  describe('password must have at least one upper case letter', () => {
    it.each(['U', 'UPPER', 'HasMultipleUpperCases'])(
      'knows that "%s" has at least one upper case letter',
      (password) => {
        const result = sut.validatePassword(password);

        expect(
          result.errors?.find(
            (err) => err.type === 'PasswordMustHaveAtLeastOneUpperCaseLetter'
          )
        ).not.toBeDefined();
      }
    );

    it.each(['u', 'lower', 'nouppercase'])(
      'knows that "%s" doesn\'t have at least one upper case letter',
      (password) => {
        const { result, errors } = sut.validatePassword(password);

        expect(result).toBeFalsy();
        expect(errors).toBeDefined();

        expect(
          errors?.find(
            (err) => err.type === 'PasswordMustHaveAtLeastOneUpperCaseLetter'
          )
        ).toBeDefined();

        expect(
          errors?.find(
            (err) => err.type === 'PasswordMustHaveAtLeastOneUpperCaseLetter'
          )?.message
        ).toContain('at least 1 upper case letter');
      }
    );
  });

  describe('multiple validation errors', () => {
    it.each([
      {
        password: 'mom',
        expected: 3,
      },
      {
        password: 'Mom',
        expected: 2,
      },
      {
        password: 'Mom1',
        expected: 1,
      },
    ])(
      'knows that "$password" has $expected error(s)',
      ({ password, expected }) => {
        const { result, errors } = sut.validatePassword(password);

        expect(result).toBeFalsy();
        expect(errors).toBeDefined();
        expect(errors!.length).toBe(expected);
      }
    );
  });
});
