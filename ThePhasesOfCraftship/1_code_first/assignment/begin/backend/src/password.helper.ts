import { UserData } from ".";

export function generateRandomPassword(length: number): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const passwordArray = [];
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      passwordArray.push(charset[randomIndex]);
    }
  
    return passwordArray.join('');
  }
  
  // We don't want to return the password within the request
  export function parseUserForResponse (user: UserData) {
    const returnData = JSON.parse(JSON.stringify(user));
    delete returnData.password;
    return returnData;
  }