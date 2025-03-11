
export class TextUtil {
  public static createRandomText(length: number): string {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+";
    let text = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      text += charset.charAt(randomIndex);
    }

    return text;
  }

  public static createRandomEmail(): string {
    const randomSequence = Math.floor(Math.random() * 1000000);
    return `testemail-${randomSequence}@gmail.com`;
  }

  public static isMissingKeys(data: any, keysToCheckFor: string[]) {
    for (const key of keysToCheckFor) {
      if (data[key] === undefined) return true;
    }
    return false;
  }
  
  public static isBetweenLength(str: string, min: number, max: number) {
    return str.length >= min && str.length <= max;
  }
  
}
