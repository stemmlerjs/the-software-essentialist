import { NextFunction, Request, Response } from "express";
import { InvalidRequestBodyException, StudentNotFoundException } from "./exceptions";
import Errors from "./constants";


function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof InvalidRequestBodyException) {
        return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false, message: error.message});
    }

    if (error instanceof StudentNotFoundException) {
        return res.status(404).json({ error: Errors.StudentNotFound, data: undefined, success: false, message: error.message });
    }

    return res.status(500).json({ error: Errors.ServerError, data: undefined, success: false, message: error.message});
}

export {
    errorHandler
}