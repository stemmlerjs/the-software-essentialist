import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user";
import { CreateUserDto } from "../dto/create-user.dto";

export class UserService{
    userRepository: Repository<User>;
    constructor(){
        this.userRepository = AppDataSource.getRepository(User);
    }

    async create(dto: CreateUserDto){
        try{
            const user: User = this.userRepository.create(dto);
            return this.userRepository.save(user)
        }
        catch(error){
            throw error;
        }
    }
}