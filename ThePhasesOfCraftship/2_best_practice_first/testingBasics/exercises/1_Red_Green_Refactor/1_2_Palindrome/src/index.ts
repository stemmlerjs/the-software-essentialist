export const isPalindrome = (val: string) => {
  const normalizedVal = val.toLowerCase().replace(/\s/g, "");
  const reversedVal = normalizedVal.split("").reverse().join("");

  if (normalizedVal === reversedVal) return true;

  return false;
};
