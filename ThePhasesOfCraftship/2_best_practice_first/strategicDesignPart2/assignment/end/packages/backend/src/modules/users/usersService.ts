import { Database } from '@dddforum/backend/src/shared/database';

export class UsersService {

    constructor(private db: Database) {}

    async createUser(userData: any) {
        const existingUserByEmail = await this.db.users.findUserByEmail(userData.email);
        if (existingUserByEmail) {
            throw new Error('EmailAlreadyInUse');
        }

        const existingUserByUsername = await this.db.users.findUserByUsername(userData.username);
        if (existingUserByUsername) {
            throw new Error('UsernameAlreadyTaken');
        }

        const { user } = await this.db.users.save(userData)

        return user;

    }

}