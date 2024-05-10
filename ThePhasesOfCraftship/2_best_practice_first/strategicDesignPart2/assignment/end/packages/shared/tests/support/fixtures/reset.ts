import { prisma } from "@dddforum/backend/src/shared/database/";

async function resetDatabase() {
    const deleteAllUsers = prisma.user.deleteMany();

    try {
        await prisma.$transaction([deleteAllUsers]);
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

export { resetDatabase };