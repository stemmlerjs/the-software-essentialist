export const isPalindrome = (str: string): boolean =>{
    const cleanedStr = str.toLowerCase();
    return cleanedStr === cleanedStr.split('').reverse().join('');
}