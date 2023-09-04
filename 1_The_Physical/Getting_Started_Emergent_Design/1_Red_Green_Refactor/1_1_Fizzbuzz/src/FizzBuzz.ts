

const isMultofThree = (val: number) => {
    return (val % 3 == 0)
}

const isMultofFive = (val: number) => {
    return (val % 5 == 0)
}

export const FizzBuzz = (val: number) => {
    if (val > 100) { throw new Error("Too large" )}
    if (val < 1) { throw new Error("Too small")}
    if (isMultofThree(val) && isMultofFive(val)) return "FizzBuzz"
    if (isMultofThree(val)) return "Fizz"
    if (isMultofFive(val)) return "Buzz" 
    return String(val)
}



