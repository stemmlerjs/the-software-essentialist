import { PasswordValidator } from './index';

describe('password validator', () => {
  let sut: PasswordValidator;

  beforeEach(() => {
    sut = new PasswordValidator();
  });

  describe('password length must be between 5 and 15 characters long', () => {
    it.each(['Password1', 'Test1', 'Length7'])(
      'knows that "%s" has valid length',
      (password) => {
        const result = sut.validatePassword(password);

        expect(result.result).toBeTruthy();
        expect(result.errors).not.toBeDefined();
      }
    );

    it.each(['Mom1', 'T123', 'PT1'])(
      'knows that "%s" has invalid length',
      (password) => {
        const { result, errors } = sut.validatePassword(password);

        expect(result).toBeFalsy();
        expect(errors).toBeDefined();
        expect(errors!.length).toBe(1);
        expect(errors![0].type).toBe('IncorrectPasswordLength');
        expect(errors![0].message).toContain('5 and 15');
      }
    );
  });

  describe('password must have at least one digit', () => {
    it.each(['Password1', 'Has1Digit', 'Has2Digits'])(
      'knows that "%s" has at least one digit',
      (password) => {
        const result = sut.validatePassword(password);

        expect(result.result).toBeTruthy();
        expect(result.errors).not.toBeDefined();
      }
    );

    it.each(['Password', 'HasNoDigits', 'HasZeroDigits'])(
      'knows that "%s" doesn\'t have at least one digit',
      (password) => {
        const { result, errors } = sut.validatePassword(password);

        expect(result).toBeFalsy();
        expect(errors!).toBeDefined();
        expect(errors!.length).toBe(1);
        expect(errors![0].type).toBe('PasswordMustHaveAtLeastOneDigit');
        expect(errors![0].message).toContain('at least 1 digit');
      }
    );
  });

  describe('password must have at least one upper case letter', () => {
    it.each(['Password1', 'Has1UpperCase', 'Has2UpperCase'])(
      'knows that "%s" has at least one upper case letter',
      (password) => {
        const result = sut.validatePassword(password);

        expect(result.result).toBeTruthy();
        expect(result.errors).not.toBeDefined();
      }
    );

    it.each(['password2', 'nouppercase1', 'has0uppercase'])(
      'knows that "%s" doesn\'t have at least one upper case letter',
      (password) => {
        const { result, errors } = sut.validatePassword(password);

        expect(result).toBeFalsy();
        expect(errors!).toBeDefined();
        expect(errors!.length).toBe(1);
        expect(errors![0].type).toBe(
          'PasswordMustHaveAtLeastOneUpperCaseLetter'
        );
        expect(errors![0].message).toContain('at least 1 upper case letter');
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
