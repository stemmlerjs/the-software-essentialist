export type Checked = {
    result: boolean,
    errors?: PasswordValidatorError[]
};

export const PasswordErrors = {
    numberOfCharacters: {
        type: 'numberOfCharacters',
        message: 'Should be in between 5 and 15 characters long',
    },
    missingNumber: {
        type: 'missingNumber',
        message: 'Should contain at least one numeric character',
    },
    missingUppercase: {
        type: 'missingUppercase',
        message: 'Should contain at least one uppercase letter',
    },
} as const;

export type PasswordErrorType = keyof typeof PasswordErrors;
export type PasswordErrorMessage = typeof PasswordErrors[PasswordErrorType]['message'];

export const lengthRestrictionError = PasswordErrors.numberOfCharacters;
export const numberRestrictionError = PasswordErrors.missingNumber;
export const uppercaseRestrictionError = PasswordErrors.missingUppercase;

export type PasswordValidatorError = {
    type: PasswordErrorType;
    message: PasswordErrorMessage;
};

export class PasswordValidator {
    static check(password: string): Checked {
        let errors: PasswordValidatorError[] = [];
        if(this.isNotBetween5And15(password)) {
            errors.push(lengthRestrictionError)
        }
        if(!/\d/.test(password)) {
            errors.push(numberRestrictionError)
        }
        if(!/[A-Z]/.test(password)) {
            errors.push(uppercaseRestrictionError)
        }
        if (errors.length) {
            return {
                result: false,
                errors
            }
        }
        return {
            result: true
        }
    }

    private static isNotBetween5And15(password: string) {
        return password.length < 5 || password.length > 15;
    }
}