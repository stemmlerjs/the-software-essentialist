export type Checked = {
    result: boolean,
    errors?: PasswordValidatorError[]
};

export type PasswordValidatorError = {
    type: PasswordErrorType,
    message: PasswordErrorMessage
};

export type PasswordErrorType = 'numberOfCharacters' | 'missingNumber';

export type PasswordErrorMessage = 'Should be in between 5 and 15 characters long' | 'Should contain at least one numeric character';

export const lengthRestrictionError: PasswordValidatorError = {
    type: "numberOfCharacters",
    message: "Should be in between 5 and 15 characters long"
}

export const numberRestrictionError: PasswordValidatorError = {
    type: 'missingNumber',
    message: 'Should contain at least one numeric character'
};

export class PasswordValidator {
    static check(password: string): Checked {
        let errors: PasswordValidatorError[] = [];
        if(password.length < 5 || password.length > 15) {
            errors.push(lengthRestrictionError)
        }
        if(!/\d/.test(password)) {
            errors.push((numberRestrictionError))
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
}