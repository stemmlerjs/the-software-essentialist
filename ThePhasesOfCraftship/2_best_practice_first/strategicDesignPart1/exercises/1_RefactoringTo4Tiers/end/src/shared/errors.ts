import { NextFunction, Request, Response } from "express";
import { InvalidRequestBodyError } from "./exceptions";
import Errors from "./constants";


function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof InvalidRequestBodyError) {
        return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
    }

    return res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
}

export {
    errorHandler
}