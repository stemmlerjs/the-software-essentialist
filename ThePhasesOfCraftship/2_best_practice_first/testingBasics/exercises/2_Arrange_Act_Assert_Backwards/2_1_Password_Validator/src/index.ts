export enum PasswordValidationErrorType {
    LENGTH = 'LENGTH',
    DIGIT = 'DIGIT',
    UPPERCASE = 'UPPERCASE'
}

export interface PasswordValidationError {
    type: PasswordValidationErrorType;
    message: string;
}

export type PasswordValidationResult = { 
    result: boolean;
    errors: PasswordValidationError[];
}

export default function validatePassword(password: string) : PasswordValidationResult {
    let isValid=true;
    let errors: PasswordValidationError[] = [];

    if(password.length < 5 || password.length > 15){
        isValid=false;
        errors.push({type: PasswordValidationErrorType.LENGTH, message: "Password must be between 5 and 15 characters long"});
    }

    if(!password.match(/[0-9]/)){
        isValid=false;
        errors.push({type: PasswordValidationErrorType.DIGIT, message: "Password must contain at least one digit"});
    }

    if(!password.match(/[A-Z]/)){
        isValid=false;
        errors.push({type: PasswordValidationErrorType.UPPERCASE, message: "Password must contain at least one uppercase letter"});
    }

    return {
        result: isValid,
        errors: errors
    }
}