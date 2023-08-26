import {Router, Request, Response, NextFunction} from 'express';
import {User} from '../models';
import {statusCode, errorMessage} from '../constants'
import { IUser } from '../interfaces/IUser';
import bcryptJs from 'bcryptjs';

class UserController {
    private path;
    public router = Router();

    constructor(path: String) {
        this.path = path;
        this.initializeRoutes(this.path);        
    }    

    private initializeRoutes = (path: String) => {
        this.router.post(`${path}/new`, this.createNewUser)
        this.router.post(`${path}/edit/:userId`, this.editUser)
        this.router.get(`${path}`, this.getUsers)
    }    

    private createNewUser = async (req : Request, res : Response, next: NextFunction) => {
        const {email, username, firstName, lastName, password} = req.body;

        const userModel = new User({
            email,
            username,
            firstName,
            lastName,
            password
        })

        userModel
            .save()
            .then(user => {
                res.status(statusCode.CREATED).json({error: 'undefined', data: this.modelToJson(user), success: true});
            })
            .catch(err => next(err));
    }    

    private editUser = async (req : Request, res : Response, next: NextFunction) => {
        const {userId} = req.params;
        
        let userModel = await User.findOne({userId});

        if(userModel) {
            await this.jsonToModel(req.body, userModel);
            
            userModel
                .save()
                .then(user => {
                    res.status(statusCode.SUCCESS).json({error: 'undefined', data: this.modelToJson(user), success: true});
                })
                .catch(err => next(err))
        } else {
            console.log('USER NOT FOUND')
            next('UserNotFound')
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