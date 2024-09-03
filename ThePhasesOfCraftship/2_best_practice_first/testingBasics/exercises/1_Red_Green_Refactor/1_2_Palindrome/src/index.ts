export const isPalindrome = (str: string): boolean =>{
    const strWithoutSpaces = str.replace(/\s+/g, '');
    const cleanedStr = strWithoutSpaces.toLowerCase();
    
    return cleanedStr === cleanedStr.split('').reverse().join('');
}