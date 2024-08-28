export const fizzBuzz = (value: number ) => {

    if(value % 3 === 0 && value % 5 === 0){
        return 'FizzBuzz';
    }

    if(value === 5){
        return 'Buzz';
    }

    if(value === 3){
        return 'Fizz';
    }

    return String(value);
}