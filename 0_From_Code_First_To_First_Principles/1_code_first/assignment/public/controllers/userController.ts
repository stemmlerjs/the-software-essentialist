import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

type UserInput = Omit<User, "id">;

export async function createUser(user: UserInput): Promise<User | null> {
  return await prisma.user.create({ data: user });
}

export async function updateUser(
  userId: string,
  user: UserInput
): Promise<User | null> {
  return await prisma.user.update({
    where: { id: parseInt(userId) },
    data: user,
  });
}

export async function getUserByKeys(user: Partial<User>): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      ...user,
      id: user.id,
    },
  });
}

export async function hasUserWithKeys(user: Partial<User>): Promise<boolean> {
  return (await getUserByKeys(user)) !== null;
}
