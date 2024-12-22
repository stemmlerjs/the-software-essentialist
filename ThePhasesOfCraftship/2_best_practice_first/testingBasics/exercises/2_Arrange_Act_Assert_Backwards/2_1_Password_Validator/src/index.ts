export default function validatePassword(password: string) {
    let isValid=true;
    let errors: {type: string, message: string}[] = [];

    return {
        result: isValid,
        errors: errors
    }
}