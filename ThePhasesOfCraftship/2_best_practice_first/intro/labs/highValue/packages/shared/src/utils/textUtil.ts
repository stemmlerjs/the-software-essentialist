
export class TextUtil {
  public static createRandomText(length: number): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+';
    let password = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
  
    return password;
  }

  public static isBetweenLength(text: string, minLength: number, maxLength: number): boolean {
    return text.length >= minLength && text.length <= maxLength;
  }
}