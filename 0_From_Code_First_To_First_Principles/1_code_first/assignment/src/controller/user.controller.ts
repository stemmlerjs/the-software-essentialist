import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/user"
import { UserService } from "../service/user.service";
import { CreateUserDto } from "../dto/create-user.dto";

export class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async create(request: Request, response: Response, next: NextFunction) {

        const { email, username, firstName, lastName } = request.body;

        const createUserDto: CreateUserDto = {
            email,
            username,
            firstName,
            lastName
        }

        return this.userService.create(createUserDto);
    }

    // async edit(request: Request, response: Response, next: NextFunction) {
    //     const id = parseInt(request.params.id)

    //     const { firstName, lastName, age } = request.body;

    //     const user = await this.userRepository.findOne({
    //         where: { id }
    //     })

    //     if (!user) {
    //         return "unregistered user"
    //     }

    //     user.firstName = firstName
    //     user.lastName = lastName

    //     return this.userRepository.save(user)
    // }

    // async get(request: Request, response: Response, next: NextFunction) {
    //     const id = parseInt(request.params.id)


    //     const user = await this.userRepository.findOne({
    //         where: { id }
    //     })

    //     if (!user) {
    //         return "unregistered user"
    //     }
    //     return user
    // }

}