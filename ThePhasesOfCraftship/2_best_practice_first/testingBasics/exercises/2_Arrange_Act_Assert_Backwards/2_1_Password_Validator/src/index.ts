export default function validatePassword(password: string) {
    let isValid=true;
    let errors: {type: string, message: string}[] = [];

    if(password.length < 5 || password.length > 15){
        isValid=false;
        errors.push({type: "length", message: "Password must be between 5 and 15 characters long"});
    }   

    return {
        result: isValid,
        errors: errors
    }
}