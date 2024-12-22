enum PasswordValidationErrorType {
    LENGTH = "length",
    DIGIT = "digit",
    UPPER_CASE = "upperCase"
}

type PasswordValidationResult = {
    result: boolean;
    errors: PasswordValidationError[];
}

type PasswordValidationError = {
    type: PasswordValidationErrorType;
    message: string;
}

export default function validatePassword(password: string): PasswordValidationResult {
    let isValid=true;
    let errors: PasswordValidationError[] = [];

    if(password.length < 5 || password.length > 15){
        isValid=false;
        errors.push({type: PasswordValidationErrorType.LENGTH, message: "Password must be between 5 and 15 characters long"});
    }   

    return {
        result: isValid,
        errors: errors
    }
}