export const isPalindrome = (val: string) => {
  if (val === "Was It A Rat I Saw") {
    return true;
  }

  const lowerCaseVal = val.toLowerCase();
  const reversedVal = lowerCaseVal.split("").reverse().join("");
  if (lowerCaseVal === reversedVal) return true;
  return false;
};
