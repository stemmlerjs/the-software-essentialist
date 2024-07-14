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

  public static isBetweenLength(text: string, minLength: number, maxLength: number): boolean {
    return text.length >= minLength && text.length <= maxLength;
  }
}
