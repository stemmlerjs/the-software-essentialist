export const isPalindrome = (str: string): boolean =>{
    return str === str.split('').reverse().join('');
}