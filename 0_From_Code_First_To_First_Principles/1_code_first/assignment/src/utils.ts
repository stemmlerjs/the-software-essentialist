import { generate as hashPassword } from 'password-hash';

export function getHashedPassword(password: string | undefined): string {
  if (!password) {
    password = generatePassword();
  }
  return hashPassword(password);
}

export function generatePassword(length = 10) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}
