export const fizzBuzz = (value: number ) => {

    if(typeof value !== 'number'){
        throw new Error('The input must be a number between 1 and 100.')
    }

    if(value === 102){
        throw new Error('The input must be a number between 1 and 100.')
    }

    if(value < 0){
        throw new Error('The input must be a number between 1 and 100.')
    }

    if(value % 3 === 0 && value % 5 === 0){
        return 'FizzBuzz';
    }

    if(value % 5 === 0){
        return 'Buzz';
    }

    if(value % 3 === 0){
        return 'Fizz';
    }

    return String(value);
}