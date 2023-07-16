import { RequestHandler } from 'express'
import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { sanitize, Trim } from 'class-sanitizer'
import { ResponseDto } from '../dto/response.dto'
import c = require('config')

export default function dtoValidationMiddleware(
    type: any,
    skipMissingProperties = false
): RequestHandler {
    return (req, res, next) => {
        if (!type) return next()
        const dtoObj = plainToClass(type, req.body)
        validate(dtoObj, { skipMissingProperties }).then(
            (errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const response: ResponseDto = {
                        error: 'ValidationError',
                        data: undefined,
                        success: false,
                    }
                    res.status(400).json(response)
                } else {
                    sanitize(dtoObj)
                    req.body = dtoObj
                    next()
                }
            }
        )
    }
}
