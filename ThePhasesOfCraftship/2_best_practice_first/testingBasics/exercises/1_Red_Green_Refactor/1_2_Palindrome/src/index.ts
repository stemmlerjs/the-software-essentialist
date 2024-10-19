export const isPalindrome = (val: string) => {
  const lowerCaseVal = val.toLowerCase();
  const reversedVal = lowerCaseVal.split("").reverse().join("");
  if (lowerCaseVal === reversedVal) return true;
  return false;
};
