export function isMissingKeys(data: any, keysToCheckFor: string[]) {
  for (const key of keysToCheckFor) {
    if (data[key] === undefined) return true;
  }
  return false;
}
