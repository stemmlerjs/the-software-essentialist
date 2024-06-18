export function isMissingKeys(data: any, keysToCheckFor: string[]) {
  for (const key of keysToCheckFor) {
    if (data[key] === undefined) return true;
  }
  return false;
}

export function isBetweenLength(str: string, min: number, max: number) {
  return str.length >= min && str.length <= max;
}
