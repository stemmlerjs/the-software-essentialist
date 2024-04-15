export class NumberUtil {
  public static generateRandomInteger(min: number, max: number) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }  
}