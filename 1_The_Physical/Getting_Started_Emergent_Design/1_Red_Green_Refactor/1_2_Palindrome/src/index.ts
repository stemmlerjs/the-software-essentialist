export const isPalindrome = (str: string) => {
    const lowerNoSpacedStr = str.toLowerCase().split(' ').join('');
    return lowerNoSpacedStr === lowerNoSpacedStr.split('').reverse().join('')
};