import { PrismaClient } from "@prisma/client";
import crypto from 'crypto'

const prisma = new PrismaClient();

function generateRandomPassword() {
  return new Array(10)
    .fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
    .map((x) =>
      (function (chars) {
        let umax = Math.pow(2, 32),
          r = new Uint32Array(1),
          max = umax - (umax % chars.length);
        do {
          crypto.getRandomValues(r);
        } while (r[0] > max);
        return chars[r[0] % chars.length];
      })(x)
    )
    .join("");
}

export async function createUser(userData: any) {
  try {
    const user = await prisma.user.create({ data: userData });
    return user
  } catch (err) {
    console.log(err);
  }
}

export async function editUser(userId: number, userData: any) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: userData,
  });
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
}
