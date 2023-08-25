import {Router, Request, Response} from 'express';
import {User} from '../models';
import {statusCode, errorMessage} from '../constants'
import { IUser } from '../interfaces/IUser';
import bcryptJs from 'bcryptjs';

const PATH = '/users';

class UserController {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }    

    private initializeRoutes = () => {
        this.router.post(`${PATH}/new`, this.createNewUser)
        this.router.post(`${PATH}/edit/:userId`, this.editUser)
        this.router.get(`${PATH}`, this.getUsers)
    }    

    private createNewUser = async (req : Request, res : Response) => {
        const {email, username, firstName, lastName, password} = req.body;       

        try {            
            const userModel = new User({
                email,
                username,
                firstName,
                lastName,
                password
            })
    
            const user = await userModel.save();

            res.status(statusCode.CREATED).json({error: 'undefined', data: this.modelToJson(user), success: true});                   

        } catch(e: any) {
            this.errorHandler(e, res);
        }
    }    

    private editUser = async (req : Request, res : Response) => {
        const {userId} = req.params;

        try {
            let userModel = await User.findOne({userId});

            if(userModel) {
                await this.jsonToModel(req.body, userModel);

                const user = await userModel.save();

                res.status(statusCode.SUCCESS).json({error: 'undefined', data: this.modelToJson(user), success: true});                
            } else {
                res.status(statusCode.USER_NOT_FOUND).json({ error: errorMessage.USER_NOT_FOUND, data: 'undefined', success: false });
            }
        } catch(e) {
            this.errorHandler(e, res);
        }
    }

    private getUsers = async (req : Request, res : Response) => {
        const {email} = req.query;

        const user = await User.findOne({email});

        if(!user) {
            res.status(statusCode.USER_NOT_FOUND).json({ error: errorMessage.USER_NOT_FOUND, data: 'undefined', success: false });    
        } else {
            res.status(statusCode.SUCCESS).json({ error: 'undefined', data: this.modelToJson(user), success: true });
        }
    }

    private generateHash = async (password: string) => {
        const SALT_WORK_FACTOR = 10;

        const salt = await bcryptJs.genSalt(SALT_WORK_FACTOR);
        const hash = await bcryptJs.hash(password, salt);

        return hash;
    }

    private jsonToModel = async (jsonObj: any, userModel: IUser) => {
        
        const {email, username, firstName, lastName, password} = jsonObj;
        let updatedPassword: any;

        if(password) {            
            updatedPassword = await this.generateHash(password);
        }
        
        userModel.username = username ?? userModel.username;
        userModel.email = email ?? userModel.email;
        userModel.firstName = firstName ?? userModel.firstName;
        userModel.lastName = lastName ?? userModel.lastName;
        userModel.password = updatedPassword ? updatedPassword : userModel.password;
    }

    private modelToJson = (user:any) => ({    
        id: user.userId,
        email: user.email,
        username: user.username, 
        firstName: user.firstName, 
        lastName: user.lastName
    })

    private errorHandler(e: any, res: Response) {
        if(e.keyValue && e.keyValue['username']) {
            res.status(statusCode.USER_NAME_ALREADY_TAKEN).json({ error: errorMessage.USERNAME_ALREADY_TAKEN, data: 'undefined', success: false });
        } else if(e.keyValue && e.keyValue['email']) {
            res.status(statusCode.EMAIL_ALREADY_IN_USE).json({ error: errorMessage.EMAIL_ALREADY_IN_USE, data: 'undefined', success: false });
        } else {
            res.status(statusCode.VALIDATION_ERROR).json({ error: errorMessage.VALIDATION_ERROR, data: 'undefined', success: false });
        }
    }
}

export default UserController;