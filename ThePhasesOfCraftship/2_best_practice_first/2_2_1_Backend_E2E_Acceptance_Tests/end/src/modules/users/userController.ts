import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(userData: any) {
  try {
    const user = await prisma.user.create({ data: userData });
    return user;
  } catch (err) {
    console.log(err);
  }
}

export async function editUser(userId: number, userData: any) {
  const user = await prisma.user.update({ where: { id: userId }, data: userData });
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
}
