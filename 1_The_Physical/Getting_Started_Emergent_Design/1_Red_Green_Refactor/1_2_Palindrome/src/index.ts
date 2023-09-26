const withoutSpaces = (str: string): string => str.indexOf(' ') === -1 ? str : withoutSpaces(str.replace(' ', ''));

const getReversed = (str: string) => str.split('').reverse().join('')
export const isPalindrome = (input: string) => {
    const formattedInput = withoutSpaces(input.toLowerCase());
    return formattedInput === getReversed(formattedInput);
};