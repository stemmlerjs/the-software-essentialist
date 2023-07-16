import { HttpCodes } from '../enum/http-codes'

export class ValidationError {
    message: string
    code: HttpCodes
    constructor() {
        this.message = 'ValidationError'
        this.code = HttpCodes.BAD_REQUEST
    }
}

export class ConflictError {
    message: string
    code: HttpCodes
    constructor(message: string) {
        this.message = message
        this.code = HttpCodes.CONFILCT
    }
}

export class NotFoundError {
    message: string
    code: HttpCodes
    constructor(message: string) {
        this.message = message
        this.code = HttpCodes.NOT_FOUND
    }
}
