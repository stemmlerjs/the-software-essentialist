const { execSync } = require("child_process");
const { PrismaClient } = require('@prisma/client');


module.exports = async () => {
  try {
    process.env.DATABASE_URL = 'postgres://postgres@localhost:5433/postgres';
    execSync('npx prisma migrate dev --preview-feature', { stdio: 'inherit' });

    const prisma = new PrismaClient();
    await prisma.user.deleteMany();
    await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1;`;
    await prisma.$disconnect();
    
  } catch (error) {
    console.error('An error occurred while migrating the test database:', error);
    throw error;
  }
};
