import {Request, Response, NextFunction} from 'express';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log('in errorMiddleware');

    const status = err.status || 500;
    const message = err.message || 'something went wrong';

    res.status(status).send({ 
        error: message, 
        data: 'undefined', 
        success: false
    });
}

export default errorMiddleware;