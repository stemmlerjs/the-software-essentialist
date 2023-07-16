import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import {
    UNIQUE_EMAIL_CONSTRAINT,
    UNIQUE_USERNAME_CONSTRAINT,
    User,
} from '../entity/user'
import { CreateUserDto } from '../dto/create-user.dto'
import { ConflictError, NotFoundError } from '../error/http-errors'
import { UserResponse } from '../dto/user.response'
import { UpdateUserDto } from '../dto/update-user.dto'

export class UserService {
    userRepository: Repository<User>
    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    async create(dto: CreateUserDto) {
        try {
            const user: User = this.userRepository.create(dto)
            const createResponse = await this.userRepository.save(user)
            const response: UserResponse = {
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

    async findOne(email: string) {
        const user = await this.userRepository.findOne({ where: { email } })
        if (!user) {
            throw new NotFoundError('UserNotFound')
        }
        const response: UserResponse = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
        }
        return response
    }

    async update(id: number, dto: UpdateUserDto) {
        try {
            const user = await this.userRepository.findOne({ where: { id } })
            if (!user) {
                throw new NotFoundError('UserNotFound')
            }
            const updatedUser = await this.userRepository.save({
                ...user,
                ...dto,
            })
            const response: UserResponse = {
                id: updatedUser.id,
                email: updatedUser.email,
                username: updatedUser.username,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
            }
            return response
        } catch (error) {
            if (error?.constraint === UNIQUE_EMAIL_CONSTRAINT) {
                throw new ConflictError('EmailAlreadyInUse')
            }
            if (error?.constraint === UNIQUE_USERNAME_CONSTRAINT) {
                throw new ConflictError('UsernameAlreadyTaken')
            }
            throw error
        }
    }
}
