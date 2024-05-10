import { generateRandomPassword } from "@dddforum/backend/src";
import { prisma } from "@dddforum/backend/src/shared/database/";
import { CreateUserParams } from "@dddforum/shared/src/api/users";

export class DatabaseFixture {

    constructor() {

    }

    async resetDatabase() {
        const deleteAllComments = prisma.comment.deleteMany();
        const deleteAllVotes = prisma.vote.deleteMany();
        const deleteAllPosts = prisma.post.deleteMany();
        const deleteMembers = prisma.member.deleteMany();
        const deleteAllUsers = prisma.user.deleteMany();

        try {
            await prisma.$transaction([
                deleteAllComments,
                deleteAllVotes,
                deleteAllPosts,
                deleteMembers,
                deleteAllUsers
            ]);
        } catch (error) {
            console.error(error);
        } finally {
            await prisma.$disconnect();
        }
    }

    async setupWithExistingUsers(createUserParams: CreateUserParams[]) {
        await prisma.$transaction(createUserParams.map((user) => {
            return prisma.user.create({
                data: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    password: generateRandomPassword(10)
                }
            })
        }))
    }
}