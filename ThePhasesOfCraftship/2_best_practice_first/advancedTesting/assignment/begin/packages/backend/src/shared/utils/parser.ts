export function isMissingKeys(data: any, keysToCheckFor: string[]) {
  for (const key of keysToCheckFor) {
    if (data[key] === undefined) return true;
  }
  return false;
}

export function parseUserForResponse(user: any) {
  const returnData = JSON.parse(JSON.stringify(user));
  delete returnData.password;
  return returnData;
}
