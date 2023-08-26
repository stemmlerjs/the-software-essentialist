import {Request, Response} from 'express';
import {statusCode, errorMessage} from '../constants';

// MongooseServerError on creation when fields already exists
// index: 0,
// code: 11000,
// keyPattern: { email: 1, username: 1 },
// keyValue: { email: 'elenaB@gmail.com', username: 'elanaB' },

// err.keyValue && err.keyValue['username']
// err.keyValue && err.keyValue['email']

const errorMiddleware = (err: any, req: Request, res: Response, next: any) => {
    
    console.log('Global error');
    console.log(JSON.stringify(err));

    const {email, username} = err.keyValue || '' ;

    if(err === errorMessage.USER_NOT_FOUND) {
        console.log('user not found')
        return res.status(statusCode.USER_NOT_FOUND).json({ error: errorMessage.USER_NOT_FOUND, data: 'undefined', success: false });
    } else if(username) {
        res.status(statusCode.USER_NAME_ALREADY_TAKEN).json({ error: errorMessage.USERNAME_ALREADY_TAKEN, data: 'undefined', success: false });
    } else if(email) {
        res.status(statusCode.EMAIL_ALREADY_IN_USE).json({ error: errorMessage.EMAIL_ALREADY_IN_USE, data: 'undefined', success: false });
    } else {
        res.status(statusCode.VALIDATION_ERROR).json({ error: errorMessage.VALIDATION_ERROR, data: 'undefined', success: false });
    }   
}

export default errorMiddleware;