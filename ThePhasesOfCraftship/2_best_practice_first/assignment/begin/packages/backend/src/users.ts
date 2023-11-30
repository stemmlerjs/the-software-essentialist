
import { prisma } from "./database";

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

export const userExists = async (userId: string): Promise<boolean> => {
  const user = await prisma.users.findUnique({
    where: { id: Number(userId) },
    select: { id: true },
  });
  return !!user;
};