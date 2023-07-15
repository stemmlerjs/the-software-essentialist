import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { UNIQUE_EMAIL_CONSTRAINT, UNIQUE_USERNAME_CONSTRAINT, User } from "../entity/user";
import { CreateUserDto } from "../dto/create-user.dto";
import { ConflictError } from "../error/http-errors";

export class UserService{
    userRepository: Repository<User>;
    constructor(){
        this.userRepository = AppDataSource.getRepository(User);
    }

    async create(dto: CreateUserDto){
        try{
            const user: User = this.userRepository.create(dto);
            return await this.userRepository.save(user)
        }
        catch(error){
            if(error?.constraint === UNIQUE_EMAIL_CONSTRAINT){
                throw new ConflictError("EmailAlreadyInUse")
            }
            if(error?.constraint === UNIQUE_USERNAME_CONSTRAINT){
                throw new ConflictError("UsernameAlreadyTaken")
            }
        }
    }
}