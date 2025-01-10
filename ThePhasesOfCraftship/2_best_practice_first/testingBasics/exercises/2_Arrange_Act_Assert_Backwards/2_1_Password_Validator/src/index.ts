export type Checked = {
    result: boolean,
    errors: PasswordValidatorError[]
};

export type PasswordValidatorError = {
    type: PasswordErrorType,
    message: PasswordErrorMessage
};

export type PasswordErrorType = 'numberOfCharacters';

export type PasswordErrorMessage = 'Should be in between 5 and 15 characters long'

export class PasswordValidator {
    static check(password: string): Checked {
        return {
            result: false,
            errors: [
                {type: "numberOfCharacters", message: "Should be in between 5 and 15 characters long"}
            ]
        }
    }
}