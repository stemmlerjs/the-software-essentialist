export const isPalindrome = (str: string): boolean =>{
     // Remove spaces and convert to lowercase
    const cleanedStr = str.replace(/\s+/g, '').toLowerCase();
    
    return cleanedStr === cleanedStr.split('').reverse().join('');
}