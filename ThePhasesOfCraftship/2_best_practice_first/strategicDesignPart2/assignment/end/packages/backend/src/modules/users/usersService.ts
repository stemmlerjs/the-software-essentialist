import { prisma } from '@dddforum/backend/src/shared/database';
import { generateRandomPassword } from '../../shared/utils';

export class UsersService {

    constructor() {}

    async createUser(userData: any) {
        const existingUserByEmail = await prisma.user.findFirst({ where: { email: userData.email }});

        if (existingUserByEmail) {
            throw new Error('EmailAlreadyInUse');
        }

        const existingUserByUsername = await prisma.user.findFirst({ where: { username: userData.username }});
        if (existingUserByUsername) {
            throw new Error('UsernameAlreadyTaken');
        }

        const { user } = await prisma.$transaction(async () => {
            const user = await prisma.user.create({ data: { ...userData, password: generateRandomPassword(10) } });
            const member = await prisma.member.create({ data: { userId: user.id }})
            return { user, member }
        })

        return user;

    }


}

const usersService = new UsersService();

export {
    usersService
}