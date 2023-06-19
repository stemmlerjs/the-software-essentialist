import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUsers() {
  const users = await prisma.user.findMany();
  console.log(users);
}

getUsers()
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    prisma.$disconnect();
  });