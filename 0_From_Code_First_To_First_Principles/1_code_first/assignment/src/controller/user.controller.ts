import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from 'express'
import { User } from '../entity/user'
import { UserService } from '../service/user.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { validate } from 'class-validator'
import { ResponseDto } from '../dto/response.dto'
import { NotFoundError, ValidationError } from '../error/http-errors'
import e = require('express')
import { UpdateUserDto } from '../dto/update-user.dto'

export class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, username, firstName, lastName } = request.body

            const createUserDto: CreateUserDto = {
                email,
                username,
                firstName,
                lastName,
            }

            const serviceResponse = await this.userService.create(createUserDto)

            const res: ResponseDto = {
                error: undefined,
                data: serviceResponse,
                success: true,
            }

            return response.status(201).json(res)
        } catch (error) {
            const res: ResponseDto = {
                error: error.message,
                data: undefined,
                success: false,
            }
            response.status(error.code).json(res)
        }
    }

    async edit(request: Request, response: Response, next: NextFunction) {
        try {
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
                error: undefined,
                data: serviceResponse,
                success: true,
            }

            return response.status(200).json(res)
        } catch (error) {
            const res: ResponseDto = {
                error: error.message,
                data: undefined,
                success: false,
            }
            response.status(error.code).json(res)
        }
    }

    async get(request: Request, response: Response, next: NextFunction) {
        try {
            const email = request.query.email as string
            if (!email) {
                throw new ValidationError()
            }

            const serviceResponse = await this.userService.findOne(email)

            const res: ResponseDto = {
                error: undefined,
                data: serviceResponse,
                success: true,
            }

            return response.status(200).json(res)
        } catch (error) {
            const res: ResponseDto = {
                error: error.message,
                data: undefined,
                success: false,
            }
            response.status(error.code).json(res)
        }
    }
}
