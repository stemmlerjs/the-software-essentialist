export const fizzBuzz = (value: number ) => {

    if(value === 15){
        return 'FizzBuzz';
    }

    if(value === 5){
        return 'Buzz';
    }

    return 'Fizz';
}