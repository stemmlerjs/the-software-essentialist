import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import {
    UNIQUE_EMAIL_CONSTRAINT,
    UNIQUE_USERNAME_CONSTRAINT,
    User,
} from '../entity/user'
import { CreateUserDto } from '../dto/create-user.dto'
import { ConflictError } from '../error/http-errors'
import { CreateUserResponse } from '../dto/create-user.response'

export class UserService {
    userRepository: Repository<User>
    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    async create(dto: CreateUserDto) {
        try {
            const user: User = this.userRepository.create(dto)
            const createResponse = await this.userRepository.save(user)
            const response: CreateUserResponse = {
                id: createResponse.id,
                email: createResponse.email,
                username: createResponse.username,
                firstName: createResponse.firstName,
                lastName: createResponse.lastName,
            }
            return response
        } catch (error) {
            if (error?.constraint === UNIQUE_EMAIL_CONSTRAINT) {
                throw new ConflictError('EmailAlreadyInUse')
            }
            if (error?.constraint === UNIQUE_USERNAME_CONSTRAINT) {
                throw new ConflictError('UsernameAlreadyTaken')
            }
        }
    }
}
