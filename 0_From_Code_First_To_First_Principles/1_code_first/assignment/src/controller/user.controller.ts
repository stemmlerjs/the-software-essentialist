import { NextFunction, Request, Response } from 'express'
import { UserService } from '../service/user.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { ResponseDto } from '../dto/response.dto'
import { NotFoundError, ValidationError } from '../error/http-errors'
import { UpdateUserDto } from '../dto/update-user.dto'
import { HttpCodes } from '../enum/http-codes'

export class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const { email, username, firstName, lastName } = request.body

        const createUserDto: CreateUserDto = {
            email,
            username,
            firstName,
            lastName,
        }

        const serviceResponse = await this.userService.create(createUserDto)

        const res: ResponseDto = {
            response:{
                error: undefined,
                data: serviceResponse,
                success: true,
            },
            code:HttpCodes.CREATED
        }
        return res;
    }

    async edit(request: Request, response: Response, next: NextFunction) {
        const userId = parseInt(request.params.userId)

        if (!userId) {
            throw new NotFoundError('UserNotFound')
        }

        const { email, username, firstName, lastName } = request.body

        const updateUserDto: UpdateUserDto = {
            email,
            username,
            firstName,
            lastName,
        }

        const serviceResponse = await this.userService.update(
            userId,
            updateUserDto
        )

        const res: ResponseDto = {
            response:{
                error: undefined,
                data: serviceResponse,
                success: true,
            },
            code:HttpCodes.OK
        }
        return res;
    }

    async get(request: Request) {
        const email = request.query.email as string
        if (!email) {
            throw new ValidationError()
        }

        const serviceResponse = await this.userService.findOne(email)

        const res: ResponseDto = {
            response:{
                error: undefined,
                data: serviceResponse,
                success: true,
            },
            code:HttpCodes.OK
        }
        return res;
    }
}
